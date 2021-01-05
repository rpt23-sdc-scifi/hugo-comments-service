const sequelize = require("./connect.js");
const { User, Song, Content, Comment } = require("./models.js");

const getComments = async (user_id, song_id, content) => {
  // set up where conditions: IF the search filter is parameter, include it
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
  const result = await Comment.findByPk(id, {
    raw: true,
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
      },
      {
        model: Song,
        attributes: [],
      },
      {
        model: Content,
        attributes: [],

      },
    ],
  });

  return result;
};

const findOrCreateReferenceData = async (model, key, value, id) => {
  const whereCondition = {};
  whereCondition[key] = value;

  console.log("whereCondition:", whereCondition);

  const instance = await model.findOrCreate({
    where: whereCondition,
  });

  const result = instance[0].toJSON()[id];

  return result;
};

const saveComment = async (data) => {
  // get user, song, content data -- create if doesn't exist, [+ time data]

  const { user_id, song_id, content } = data;

  data.user_id = await findOrCreateReferenceData(
    User,
    "system_number",
    user_id,
    "user_id"
  );

  data.song_id = await findOrCreateReferenceData(
    Song,
    "system_number",
    song_id,
    "song_id"
  );

  data.content_id = await findOrCreateReferenceData(
    Content,
    "text",
    content,
    "content_id"
  );

  // create new comment with keys pointing to referenced tables
  const result = await Comment.create(data);

  return result.toJSON().comment_id;
};

const updateComment = async (id, data) => {
  const { user_id, song_id, content, time_stamp } = data;

  const comment = await Comment.findByPk(id);
  const originalComment = getCommentByID(id);

  if (user_id) {
    comment.user_id = await findOrCreateReferenceData(
      User,
      "system_number",
      user_id,
      "user_id"
    );
  }

  if (song_id) {
    comment.song_id = await findOrCreateReferenceData(
      Song,
      "system_number",
      song_id,
      "song_id"
    );
  }

  if (content) {
    comment.content_id = await findOrCreateReferenceData(
      Content,
      "text",
      content,
      "content_id"
    );
  }

  comment.time_stamp = time_stamp ? time_stamp : comment.time_stamp;

  await comment.save();
  await comment.reload();

  return originalComment;
};

const deleteComment = async (id) => {
  const comment = await Comment.findByPk(id);
  await comment.destroy();
  return comment.toJSON().comment_id;
};

module.exports = {
  getComments,
  getCommentByID,
  saveComment,
  updateComment,
  deleteComment,
};
