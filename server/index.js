const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("../db/index");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const port = 4000;

const app = express();

// app.use(express.static('./dist'));
app.use(
  "/",
  expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "dist, max-age=31536000");
    },
  })
);

app.use(express.json());
app.use(cors());

app.get("/comments", async (req, res) => {
  try {
    const comments = await db.getComments();
    res.status(200).send({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
});

// ID = SONG ID!!!
app.get("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await db.getComment(id);

    if (!comment || id > 100) {
      return res.status(400).json({
        succes: false,
        msg: `no song with id ${id}`,
      });
    }

    if (comment.length === 0) {
      return res.status(400).json({
        succes: false,
        msg: `song ${id} doesn't have comments`,
      });
    }

    res.status(200).send({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      succes: false,
      msg: error,
    });
  }
});

app.post("/comments/:id", async (req, res) => {
  try {
    const data = req.body;
    data.comment_id = req.params.id;
    console.log(data);
    const result = await db.saveComment(data);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
  // db.saveComment;
  // const saveComment = (comment) => {
  //   let newComment = new Comment({
  //     comment_id: comment.comment_id,
  //     user_id: comment.user_id,
  //     song_id: comment.song_id,
  //     content: comment.content,
  //     time_stamp: comment.time_stamp,
  //   });
});

app.get("/:current", (req, res) => {
  console.log("hit");
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
