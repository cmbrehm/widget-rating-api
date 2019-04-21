const request=require('supertest');
//const server=require('../middleware/index')

const app='http://localhost:3000';

describe('api-test', function() {
  let name=`w${Date.now()}`;
  let id;
  it('should allow add and retrieve of widgets', function (done) {
    request(app)
      .post('/api/new').send({name: name})
      .set('content-type','application/json')
      .set('accept','application/json')
      .expect(201)
      .expect(response => {
        id = response.body.id
      })
      .end(err=>{if (err) done(err); else done()});
  });

  it('should retrieve items', function(done) {
    request(app).get(`/api/${id}`)
      .expect(200).expect({id: id, name: name})
      .end(err=>{if (err) done(err); else done()});
  });

  it('should allow for mulitple ratings', async function() {
    const fn=(r)=>{
      return new Promise((resolve,reject)=>{
        request(app)
        .post(`/api/rate/${id}`).send({rating: r})
        .expect(201)
        .end(err=>{if (err) reject(err); else resolve()})
      });
    }
    await Promise.all([fn(1), fn(2), fn(4), fn(5)]);
  });
  it ('should reject ratings not between 1 and 5', function(done) {
    request(app)
      .post(`/api/rate/${id}`).send({rating: 0})
      .expect(500)
      .end(err=> {if (err) done(err); else done()});
  })
  it('should retrieve average rating', function(done) {
    request(app).get(`/api/summary/${id}`)
      .expect(200).expect({averageRating: '3.0', numRatings: 4})
      .end(err=>{if (err) done(err); else done()});
  });
})
