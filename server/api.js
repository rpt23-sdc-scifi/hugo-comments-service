const express = require("express");
const router = express.Router();
const redis = require("redis");
const { promisify } = require("util");

const db = require("../db/controller.js");

// The Comments API is served at the "/api" path, i.e. "/api/comments"

// Creating and connecting redis client to local instance (port 6379)
const redisClient = redis.createClient(6379);

// Log Redis Error
redisClient.on("error", (err) => {
  console.log(err);
});

// redisClient.set("key", "value", redis.print);
// redisClient.get("key", redis.print);

// promisify redisClient
const getRedis = promisify(redisClient.get).bind(redisClient);
console.log(getRedis);
getRedis("key").then(console.log).catch(console.error);

// API: get all comments that match search critiera
router.get("/comments", async (req, res) => {
  try {
    let { user_id, song_id, content } = req.query;

    user_id = Number(user_id);
    song_id = Number(song_id);

    const comments = await db.getComments(user_id, song_id, content);

    const result = {
      count: comments.length,
      data: comments,
    };
    // send 404 if request is valid but no results found
    if (comments.length === 0) {
      res.status(404).send(result);
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// API: get a comment by comment ID
router.get("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.getCommentByID(id);

    // send 404 if request is valid but no results found
    if (comment === null) {
      res.status(404).send({ comment_id: id, message: "no results found" });
      return;
    }
    res.status(200).send(comment);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

// API: add a new comment
router.post("/comments", async (req, res) => {
  try {
    const data = req.body;
    const comment_id = await db.saveComment(data);
    res
      .status(201)
      .send({ comment_id, message: "successfully created comment" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// API: update an existing comment
router.patch("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const comment_id = await db.updateComment(id, data);
    res
      .status(200)
      .send({ comment_id, message: "successfully updated comment" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// API: delete a comment
router.delete("/comments/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const comment_id = await db.deleteComment(id);
    res
      .status(200)
      .send({ comment_id, message: "successfully deleted comment" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
