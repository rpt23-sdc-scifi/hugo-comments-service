const mongoose = require('mongoose');
const db = require('../db/index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/index');

let should = chai.should();
chai.use(chaiHttp);

describe('/GET comments', () => {
  it('it should GET all the comments', (done) => {
    chai.request(app)
        .get('/comments')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a('array');
              res.body.data.length.should.be.gt(36); //gt is greater than
          done();
        });
  });
});

describe('/GET comment', () => {
  it('it should GET one comment for song_id 1', (done) => {
    chai.request(app)
        .get('/comments/1')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a('array');
              res.body.data.length.should.equal(1);
          done();
        });
  });
});