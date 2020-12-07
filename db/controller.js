const { User, Song, Content } = require("./models.js");

const getComments = async (filter) => {
  // const result = await User.findAll({
  //   limit: 1000,
  //   where: {
  //     user_id: 1,
  //   },
  // });
  // console.log(result);

  const result2 = await Content.findAll({
    where: {
      text: "Nulla eiusmod ut sint dolore.",
    },
  });
  console.log(result2);

  // const newUser = await User.create({ system_number: 100000000 });
  // console.log("newUser's auto-generated ID:", newUser);

  // await User.update({system_number: -100}, {
  //   where: {
  //     system_number: 100000000
  //   }
  // })

  // await User.destroy({
  //   where: {
  //     system_number: -100
  //   }
  // });

  // const result3 = await User.findAll({
  //   where: {
  //     system_number: -100
  //   },
  // });
  // console.log(result3);

};

getComments();





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
};
