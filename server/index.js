const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("../db/index");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const port = 4000;

const app = express();

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

// API: get all comments that match search critiera
app.get("/api/comments", async (req, res) => {
  try {
    for (parameter in req.query) {
      req.query[parameter] = Number(req.query[parameter]);
    }
    const comments = await db.getComments(req.query);
    res.status(200).send({
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: error,
    });
  }
});

// API: get a comment by comment ID
app.get("/api/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.getCommentByID(id);
    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// API: add a new comment
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

// API: update an existing comment
app.patch("/api/comments/:id", async (req, res) => {
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

// API: delete a comment
app.delete("/api/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.deleteComment(id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

app.get("/:current", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
