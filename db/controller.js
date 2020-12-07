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

const getCommentByID = async (id) => {
  const result = await Comment.findByPk(id);
  return result;
};

const findOrCreateReferenceData = async (data) => {
  const user = await User.findOrCreate({
    where: {
      system_number: data.user_id,
    },
  });
  const user_id = user[0].toJSON().user_id;

  const song = await Song.findOrCreate({
    where: {
      system_number: data.song_id,
    },
  });
  const song_id = song[0].toJSON().song_id;

  const content = await Content.findOrCreate({
    where: {
      text: data.content,
    },
  });
  const content_id = content[0].toJSON().content_id;

  return {
    song_id,
    user_id,
    content_id,
    time_stamp: data.time_stamp,
  };
};

const saveComment = async (comment) => {
  // get user, song, content info -- create if doesn't exist
  const data = await findOrCreateReferenceData(comment);
  // create new comment with keys pointing to referenced tables
  const newComment = await Comment.create(data);
  return newComment;
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
