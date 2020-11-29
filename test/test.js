const mongoose = require("mongoose");
const db = require("../db/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server/index");

let should = chai.should();
chai.use(chaiHttp);

// I should probably be using a seperate test database for these tests, but I don't feel like coding it right now, maybe later

// ObjectID of comment that exists
let existingComment = {
  _id: "5fc3223c5b11641d723798c8",
  user_id: 4,
  song_id: 29,
  content: "Id anim dolor ea aliquip occaecat consectetur.",
  time_stamp: 125,
};

let newComment = {
  user_id: 45,
  song_id: 182,
  content: "WTF??? This song is terrible.",
  time_stamp: 333,
  random: true, // this should not be saved because it's not in the schema
};

let newCommentID = null;

describe("/GET comments", () => {
  it("should GET all the comments", (done) => {
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
  it("should GET comments for song_id 1", (done) => {
    chai
      .request(app)
      .get("/comments/song/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should not GET any comments for a non-existant song_id 50000", (done) => {
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
  it("should GET comments for specific comment_id", (done) => {
    chai
      .request(app)
      .get(`/comments/id/${existingComment._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should not GET any comments for a non-existant id 50000", (done) => {
    chai
      .request(app)
      .get("/comments/id/50000")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.a("string");
        done();
      });
  });
});

describe("/POST comment", () => {
  it("should create a new comment", (done) => {
    chai
      .request(app)
      .post("/comments")
      .type("json")
      .send(newComment)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.song_id.should.equal(182);
        res.body.content.should.equal("WTF??? This song is terrible.");
        res.body.should.not.have.property("random");
        newCommentID = res.body._id;
        done();
      });
  });
});

describe("/PATCH comment", () => {
  it("should update an existing comment", (done) => {
    chai
      .request(app)
      .patch(`/comments/id/${newCommentID}`)
      .type("json")
      .send({
        content: "Yo, this is the best song EVER!!!",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.song_id.should.equal(182);
        res.body.content.should.equal("Yo, this is the best song EVER!!!");
        done();
      });
  });
});
