const mongoose = require("mongoose");

const database = "soundcloud";

mongoose.connect(`mongodb://localhost/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log(`mongodb connected to db "${database}"!`);
});

const dropCollection = async () => {
  await db.dropCollection("comments");
  console.log("comments collection dropped");
};

const commentSchema = new mongoose.Schema({
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

// modify comment fields when returning data to match API
commentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj["comment_id"] = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Comment = mongoose.model("Comment", commentSchema);

const getComments = async () => {
  return Comment.find();
};

// this id is the MongoDB auto-generated ObjectId
const getCommentByID = async (id) => {
  const result = await Comment.findOne({ _id: id });
  if (result === null) {
    throw new Error(`no comment with id ${id}`);
  }
  return result;
};

const saveComment = async (comment) => {
  let newComment = new Comment({
    user_id: comment.user_id,
    song_id: comment.song_id,
    content: comment.content,
    time_stamp: comment.time_stamp, // length of song in seconds
  });
  const result = await newComment.save(newComment);
  return result;
};

const updateComment = async (id, data) => {
  const result = await Comment.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (result === null) {
    throw new Error(`no comment with id ${id}`);
  }
  return result;
};

const deleteComment = async (id) => {
  const result = await Comment.findOneAndDelete({ _id: id });
  if (result === null) {
    throw new Error(`no comment with id ${id}`);
  }
  return result;
};

module.exports = {
  getComments,
  getCommentByID,
  saveComment,
  updateComment,
  deleteComment,
  dropCollection,
};
