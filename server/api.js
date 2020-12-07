const express = require("express");
const router = express.Router();
const db = require("../db/controller.js");

// The Comments API is served at the "/api" path, i.e. "/api/comments"

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
    }

    res.status(200).send(result);
  } catch (error) {
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
      res.status(404).send({ message: "no results found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// API: add a new comment
router.post("/comments", async (req, res) => {
  try {
    const data = req.body;
    await db.saveComment(data);
    res.status(201).send({ message: "successfully created comment" });
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
    await db.updateComment(id, data);
    res.status(200).send({ message: `successfully updated comment ${id}` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// API: delete a comment
router.delete("/comments/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.deleteComment(id);
    res.status(200).send({ message: `successfully deleted comment ${id}` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
