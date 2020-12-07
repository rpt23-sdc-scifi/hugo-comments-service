const sequelize = require("./connect.js");
const { User, Song, Content, Comment } = require("./models.js");

const getComments = async (user_id, song_id, content) => {
  const userWhereCondition = user_id ? { system_number: user_id } : {};
  const songWhereCondition = song_id ? { system_number: song_id } : {};
  const contentWhereCondition = content ? { text: content } : {};

  const result = await Comment.findAll({
    raw: true,
    limit: 1000,
    attributes: [
      "comment_id",
      [sequelize.col("User.system_number"), "user_id"],
      [sequelize.col("Song.system_number"), "song_id"],
      [sequelize.col("Content.text"), "content"],
      "time_stamp",
    ],
    include: [
      {
        model: User,
        attributes: [],
        where: userWhereCondition,
      },
      {
        model: Song,
        attributes: [],
        where: songWhereCondition,
      },
      {
        model: Content,
        attributes: [],
        where: contentWhereCondition,
      },
    ],
  });

  return result;
};

// const result2 = await Comment.findAll({
//   limit: 1000,
//   where: {
//     song_id: 641135,
//     user_id: 723936,
//   },
// });

// const result2 = await Comment.findByPk(10000);
// console.log(result2);

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

const getCommentByID = async (id) => {
  const result = await Comment.findByPk(id);
  return result;
};

const saveComment = async (comment) => {
  const newComment = await Comment.create({
    user_id: comment.user_id,
    song_id: comment.song_id,
    content: comment.content,
    time_stamp: comment.time_stamp,
    include: [
      {
        association: Comment.User,
        include: [],
      },
    ],
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
  const comment = await Comment.findByPk(id);
  return comment.destroy();
};

module.exports = {
  getComments,
  getCommentByID,
  saveComment,
  updateComment,
  deleteComment,
};
