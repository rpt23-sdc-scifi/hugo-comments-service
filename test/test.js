let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server/index");

let should = chai.should();
chai.use(chaiHttp);

// I should probably be using a seperate test database for these tests, but I don't feel like coding it right now, maybe later

// Existing comment data: comment #1 (already loaded into database)
let existingComment = {
  comment_id: 1,
  user_id: 5426410,
  song_id: 2816391,
  content: "Anim aute ad nostrud.",
  time_stamp: 52,
};

let newComment = {
  user_id: 45,
  song_id: 182,
  content: "WTF??? This song is terrible.",
  time_stamp: 333,
  random: true, // this should not be saved because it's not in the schema
};

let newCommentID = null;

describe("/GET comments by song ID", () => {
  it("should GET comments for song_id", (done) => {
    chai
      .request(app)
      .get(`/api/comments?song_id=${existingComment.song_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it("should GET comments for content parameter", (done) => {
    chai
      .request(app)
      .get(`/api/comments?content=${existingComment.content}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        res.body.data.should.have.lengthOf.above(0);
        done();
      });
  });

  it("should not GET any comments for a non-existant song_id 5000000000", (done) => {
    chai
      .request(app)
      .get("/api/comments?song_id=5000000000")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.data.should.be.a("array");
        res.body.data.should.have.lengthOf(0);
        done();
      });
  });
});

describe("/GET comments by comment ID", () => {
  it("should GET comments for specific comment id", (done) => {
    chai
      .request(app)
      .get(`/api/comments/${existingComment.comment_id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should not GET any comments for a non-existant id 5000000000", (done) => {
    chai
      .request(app)
      .get("/api/comments/5000000000")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal("no results found");
        done();
      });
  });
});

describe("/POST comment", () => {
  it("should create a new comment", (done) => {
    chai
      .request(app)
      .post("/api/comments")
      .type("json")
      .send(newComment)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.message.should.equal("successfully created comment");
        newCommentID = res.body.comment_id;
        done();
      });
  });
});

describe("/PATCH comment", () => {
  it("should update an existing comment", (done) => {
    chai
      .request(app)
      .patch(`/api/comments/${newCommentID}`)
      .type("json")
      .send({
        content: "Yo, this is the best song EVER!!!",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.equal("successfully updated comment");
        done();
      });
  });
});

describe("/DELETE comment", () => {
  it("should delete an existing comment", (done) => {
    chai
      .request(app)
      .delete(`/api/comments/${newCommentID}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.comment_id.should.equal(newCommentID);
        res.body.message.should.equal("successfully deleted comment");
        done();
      });
  });
});
