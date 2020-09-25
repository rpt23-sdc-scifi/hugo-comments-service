const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fec-soundcloud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('mongodb connected!')
});

db.dropCollection("comments", (err, result) =>  {
  console.log("comments collection dropped");
});

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: Number,
    unique: true,
    required: true
  },
  user_id: Number,
  song_id: Number,
  content: String,
  time_stamp: Number
});

let Comment = mongoose.model('Comment', commentSchema);

let saveComment = (comment) => {
  let newComment = new Comment({
    comment_id: comment.comment_id,
    user_id:    comment.user_id,
    song_id:    comment.song_id,
    content:    comment.content,
    time_stamp: comment.time_stamp

  });
  newComment.save((err, newComment) => {
    if (err) return console.error('save error: ', err);
  });
}

module.exports.saveComment = saveComment;

// db.close();