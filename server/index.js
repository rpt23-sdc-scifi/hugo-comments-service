const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('../db/index');

const port = 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/comments', async(req, res) => {
  try {
    const comments = await db.getComments();
    res.status(200).send({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: error
    });
  }
});

app.get('/comments/:id', async(req, res) => {
  try {
    const { id } = req.params;

    const comment = await db.getComment(id);

    if ( id > 100 ) {
      return res.status(400).json({
        succes: false,
        msg: `no song with id ${id}`
      });
    }

    if ( comment.length === 0 ) {
      return res.status(400).json({
          succes: false,
          msg: `song ${id} doesn't have comments`
        });
    }

    res.status(200).send({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      succes: false,
      msg: error
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;