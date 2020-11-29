const mongoose = require("mongoose");
const db = require("../db/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server/index");

let should = chai.should();
chai.use(chaiHttp);

describe("/GET comments", () => {
  it("it should GET all the comments", (done) => {
    chai
      .request(app)
      .get("/comments")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        res.body.data.length.should.be.gt(36);
        done();
      });
  });
});

describe("/GET comments by song ID", () => {
  it("it should GET comments for song_id 1", (done) => {
    chai
      .request(app)
      .get("/comments/song/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("it should not GET any comments for a non-existant song_id 50000", (done) => {
    chai
      .request(app)
      .get("/comments/song/50000")
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body.error);
        res.body.error.should.be.a("string");
        res.body.error.should.equal("song 50000 doesn't have comments");
        done();
      });
  });
});

describe("/GET comments by comment ID", () => {
  it("it should GET comments for comment_id 1", (done) => {
    chai
      .request(app)
      .get("/comments/id/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should not GET any comments for a non-existant id 50000", (done) => {
    chai
      .request(app)
      .get("/comments/id/50000")
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body.error);
        res.body.error.should.be.a("string");
        res.body.error.should.equal("no comment with id 50000");
        done();
      });
  });
});

describe("");
