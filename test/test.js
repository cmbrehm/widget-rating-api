const request=require('supertest');
const server=require('../middleware/index')
describe('api-test', function() {
  it('should allow add and retrieve of widgets', function (done) {
    request('http://localhost:3000').post('/api/new').send({name: 'Testy'})
      .expect(201);
    request('http://localhost:3000').get('/api').expect(200)
      .then(req=>console.log(req.body))
      .finally(done());
  })
})
