'use strict';

const express=require('express'),
  pg=require('pg'),
  app=express(),
  router=express.Router();

//https://node-postgres.com/api/pool for options
//credentials will come from process.env

const pool=new pg.Pool({
  max: 5,
  connectionTimeoutMillis:3000
});

const errHandler = fn =>
  (req, res, nx) => {
    Promise.resolve(fn(req, res, nx))
      .catch(err=> {
        console.error("caught error",err);
        res.status(500).send(err);
      });
  };

router.post('/new', errHandler(async (req,resp, nx) => {
  console.log('body', req.body);
  const out=await pool.query({
    text: 'insert into widget (name) values ($1) returning *',
    values: [ req.body.name ]
  })
  resp.status(201).send(out.rows[0]);
}));
router.get('/',errHandler(async (req,resp, nx) => {
  const out=await pool.query({
    text: 'select * from widget'
  })
  resp.json(out.rows);
}));
router.get('/:id', errHandler(async (req,resp, nx) => {
  const out=await pool.query({
    text: 'select * from widget where id=$1',
    values: [ req.params.id ]
  });
  resp.json(out.rows[0]);
}));
router.post('/rate/:widget', errHandler(async (req,resp, nx)=> {
  let r=Number(req.body.rating)
  if (r== Number.NaN || r<1 || r>5)
    resp.status(500).send(`invalid rating ${r} - must be between 1 and 5 inclusive` )
  else {
    const out=await pool.query({
      text: 'insert into widget_ratings (widget_id, rating) values ($1, $2)',
      values: [ req.params.widget, r ]
    });
    resp.status(201).send()
  }
}));
router.get('/summary/:widget', errHandler(async (req, resp, nx) => {
  const out=await pool.query({
    text: 'select avg(rating) as avg_rating, count(*) as num_ratings from widget_ratings where widget_id=$1',
    values: [ req.params.widget ]
  });
  let rv = {numRatings: Number(out.rows[0].num_ratings)}
  let r = Number(out.rows[0]['avg_rating']);
  if (r !== Number.Nan) rv.averageRating = r.toPrecision(2);
  resp.json(rv)
}));

app.use(express.json({type: '*/*'}));
app.use('/api',router);

app.listen(process.env.PORT || 3000);
