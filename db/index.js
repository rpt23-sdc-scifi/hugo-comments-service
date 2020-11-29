const mongoose = require("mongoose");

const database = 'fec-soundcloud-comments';

mongoose.connect(`mongodb://localhost/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log(`mongodb connected to db "${database}"!`);
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
  user_id: {
    type: Number,
    required: true,
  },
  song_id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time_stamp: {
    type: Number,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

const saveComment = async (comment) => {
  // auto-generate new comment ID (increment +1 existing max ID = total comment count)
  // two methods: countDocuments() vs. estimatedDocumentCount() which is faster for large collections but possibly inaccurate
  const commentCount = await Comment.estimatedDocumentCount();
  let newComment = new Comment({
    comment_id: commentCount + 1,
    user_id: comment.user_id,
    song_id: comment.song_id,
    content: comment.content,
    time_stamp: comment.time_stamp, // random integer between zero and length of song in seconds
  });
  console.log(newComment);
  const result = await newComment.save(newComment);
  return result;
};

const getComments = async () => {
  return Comment.find();
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