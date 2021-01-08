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
    console.log("query", req.query);

    user_id = Number(user_id);
    song_id = Number(song_id);

    // create redisKey string
    let redisKey = "";
    if (user_id) {
      redisKey = redisKey.concat(`user:${user_id}`);
    }
    if (song_id) {
      redisKey = redisKey.concat(`song:${song_id}`);
    }
    if (content) {
      redisKey = redisKey.concat(`content:${content}`);
    }
    console.log("redisKey: ", redisKey);

    if (redisKey === "") {
      throw new Error("invalid search parameters");
    }

    let comments = JSON.parse(await redisGet(redisKey));

    // else, retrieve data from database and create redis key
    if (!comments) {
      comments = await db.getComments(user_id, song_id, content);
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
    const newData = req.body;
    const originalData = await db.updateComment(id, newData);

    // cache invalidation -- delete all associated redis keys of ORIGINAL record
    await redisDel(`comment:${id}`); // delete comment:id key
    await redisDel(`user:${originalData.user_id}`); // delete user:id key
    await redisDel(`song:${originalData.song_id}`); // delete song:id key
    await redisDel(`content:${originalData.content}`); // delete content:text key
    // delete all combinations of user/song/content keys (user:song, user:content, song:content, user:song:content)
    await redisDel(`user:${originalData.user_id}song:${originalData.song_id}`);
    await redisDel(
      `user:${originalData.user_id}content:${originalData.content}`
    );
    await redisDel(
      `song:${originalData.song_id}content:${originalData.content}`
    );
    await redisDel(
      `user:${originalData.user_id}song:${originalData.song_id}content:${originalData.content}`
    );

    // cache invalidation -- delete all associated redis keys of NEW record
    await redisDel(`comment:${id}`); // delete comment:id key
    await redisDel(`user:${newData.user_id}`); // delete user:id key
    await redisDel(`song:${newData.song_id}`); // delete song:id key
    await redisDel(`content:${newData.content}`); // delete content:text key
    // delete all combinations of user/song/content keys (user:song, user:content, song:content, user:song:content)
    await redisDel(`user:${newData.user_id}song:${newData.song_id}`);
    await redisDel(`user:${newData.user_id}content:${newData.content}`);
    await redisDel(`song:${newData.song_id}content:${newData.content}`);
    await redisDel(
      `user:${newData.user_id}song:${newData.song_id}content:${newData.content}`
    );

    res.status(200).send({
      originalComment: originalData,
      message: "successfully updated comment",
    });
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

    // cache invalidation: delete comment from redis
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

/*
Refactor: store each comment as a KEY, then look for it
"SCAN command?", or using SETS
"user.id.12312:song.id.23:coment.fsdfdasadsf"
redis.get(pattern="user.id123")
redis.get(pattern="user.id123:song.id.324")
*/