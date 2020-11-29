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

// route to get all comments in database
app.get("/api/comments", async (req, res) => {
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

// route to get all comments by song ID
app.get("/api/comments/song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await db.getCommentsBySong(id);
    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// route to get a comment by specific comment ID
app.get("/api/comments/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.getCommentByID(id);
    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// route to add a comment
app.post("/api/comments", async (req, res) => {
  try {
    const data = req.body;
    const result = await db.saveComment(data);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// route to update an existing comment
app.patch("/api/comments/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await db.updateComment(id, data);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// route to delete a comment
app.delete("/api/comments/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.deleteComment(id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

app.get("/", (req, res) => {
  console.log("hit");
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
