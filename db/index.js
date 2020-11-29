const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/fec-soundcloud-comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("mongodb connected!");
});

// db.dropCollection("comments", () =>  {
//   console.log("comments collection dropped");
// });

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: Number,
    unique: true,
    required: true,
  },
  user_id: Number,
  song_id: Number,
  content: String,
  time_stamp: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

const saveComment = (comment) => {
  let newComment = new Comment({
    comment_id: comment.comment_id,
    user_id: comment.user_id,
    song_id: comment.song_id,
    content: comment.content,
    time_stamp: comment.time_stamp,
  });

  return newComment.save(newComment);
};

const getComments = () => {
  return Comment.find().limit(1000);
};

const getCommentsBySong = async (song_id) => {
  const results = await Comment.find({ song_id });
  if (results.length === 0) {
    throw new Error(`song ${song_id} doesn't have comments`);
  }
  return results;
};

const getCommentByID = async (comment_id) => {
  const result = await Comment.findOne({ comment_id });
  if (result === null) {
    throw new Error(`no song with id ${comment_id}`);
  }
  return result;
};

module.exports = {
  getComments, getCommentsBySong, getCommentByID, saveComment
}