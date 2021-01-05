const express = require("express");
const router = express.Router();
const redis = require("redis");
const { promisify } = require("util");

const db = require("../db/controller.js");

// The Comments API is served at the "/api" path, i.e. "/api/comments"

// Creating and connecting redis client to local instance (default is port 6379)
const redisClient = redis.createClient();

// Log Redis Errors
redisClient.on("error", (err) => {
  console.log(err);
});

// Promisify redisClient
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const redisDel = promisify(redisClient.del).bind(redisClient);
const redisExists = promisify(redisClient.exists).bind(redisClient);

// API: get all comments that match search critiera
router.get("/comments", async (req, res) => {
  try {
    let { user_id, song_id, content } = req.query;

    // create redisKey string
    let redisKey = "";
    if (user_id) {
      user_id = Number(user_id);
      redisKey = redisKey.concat(`user:${user_id}`);
    }
    if (song_id) {
      song_id = Number(song_id);
      redisKey = redisKey.concat(`song:${song_id}`);
    }
    if (content) {
      redisKey = redisKey.concat(`content:${content}`);
    }
    if (redisKey === "") {
      redisKey = null;
    }
    console.log("redisKey: ", redisKey);

    let comments = JSON.parse(await redisGet(redisKey));

    // else, retrieve data from database and create redis key
    if (comments === null) {
      comments = await await db.getComments(user_id, song_id, content);
      if (comments) {
        await redisSet(redisKey, JSON.stringify(comments));
      }
    }

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

    // retrieve data from redis if key exists
    let comment = JSON.parse(await redisGet(`comment:${id}`));

    // else, retrieve data from database and create redis key
    if (comment === null) {
      comment = await db.getCommentByID(id);
      if (comment) {
        await redisSet(`comment:${id}`, JSON.stringify(comment));
      }
    }

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

    // should a redis key be created for a new comment?

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
    const originalComment = await db.updateComment(id, data);

    // cache invalidation -- delete all associated redis keys of ORIGINAL record
    await redisDel(`comment:${id}`); // delete comment:id key
    await redisDel(`user:${data.user_id}`); // delete user:id key
    await redisDel(`song:${data.song_id}`); // delete song:id key
    await redisDel(`content:${data.content}`); // delete content:text key
    // delete all combinations of user/song/content keys (user:song, user:content, song:content, user:song:content)
    await redisDel(`user:${data.user_id}song:${data.song_id}`);
    await redisDel(`user:${data.user_id}content:${data.content}`);
    await redisDel(`song:${data.song_id}content:${data.content}`);
    await redisDel(`user:${data.user_id}song:${data.song_id}content:${data.content}`);

    // cache invalidation -- delete all associated redis keys of NEW record

    res
      .status(200)
      .send({ originalComment: originalComment, message: "successfully updated comment" });
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

    // delete comment from redis
    await redisDel(`comment:${id}`);

    res
      .status(200)
      .send({ comment_id, message: "successfully deleted comment" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
