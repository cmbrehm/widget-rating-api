'use strict';

const express=require('express'),
  pg=require('pg'),
  app=express(),
  router=express.Router();

//https://node-postgres.com/api/pool for options
//credentials will come from process.env

const pool=new pg.Pool({
  max: 3
});

const errHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.post('/new', errHandler(async (req,resp,nx) => {
  const out=await pool.query({
    text: 'insert into widget (name) values ($1)',
    values: [ req.body.name ]
  })
}));
router.get('/',errHandler(async (req,resp,nx) => {
  const out=await pool.query({
    text: 'select * from widget'
  })
  resp.json(out.rows);
}));
router.get('/:id', errHandler(async (req,resp,nx) => {
  const out=await pool.query({
    text: 'select * from widget where id=$1',
    values: [ Number(req.params.id) ]
  });
  resp.json(out.rows[0]);
}));
router.post('/rate/:widget', errHandler(async (req,resp,nx)=> {
  const out=await pool.query({
    text: 'insert into widget_ratings (widget_id, rating) values ($1, $2)',
    values: [ Number(req.params.widget), req.body.rating ]
  });
}));
router.get('/summary/:widget', errHandler(async (req, resp,nx) => {
  const out=await pool.query({
    text: 'select avg(rating) from widget_ratings where widget_id=$1',
    values: [ Number( req.params.widget )]
  });
}));

app.use('/api',router);
app.use(express.json());
app.listen(process.env.PORT || 3000);
