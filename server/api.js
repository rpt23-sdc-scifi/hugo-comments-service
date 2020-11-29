const express = require("express");
const router = express.Router();
const db = require("../db/controller.js");

// The Comments API is served at the "/api" path, i.e. "/api/comments"

// API: get all comments that match search critiera
router.get("/comments", async (req, res) => {
  try {
    console.log(req.query);
    for (parameter in req.query) {
      if (parameter === "content") {
        break;
      }
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
router.get("/comments/:id", async (req, res) => {
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
router.post("/comments", async (req, res) => {
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
router.patch("/comments/:id", async (req, res) => {
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
router.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.deleteComment(id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;