const mongoose = require("mongoose");

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

module.exports = Comment;
