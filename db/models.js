const { DataTypes, Model } = require("sequelize");
const sequelize = require("./connect.js");

// using sequelize.define syntax for the User model
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    system_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamps: false,
    indexes: [
      {
        name: "idx_system_number",
        fields: ["system_number"],
      },
    ],
  }
);

// using Model.init syntax for the Songs model -- the two syntaxes are functionally equivalent, both return the model
class Song extends Model {}

Song.init(
  {
    // Model attributes are defined here
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    system_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Song", // We need to choose the model name
    timestamps: false,
    indexes: [
      {
        name: "idx_system_number",
        fields: ["system_number"],
      },
    ],
  }
);

const Content = sequelize.define(
  "Content",
  {
    // Model attributes are defined here
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "content",
    timestamps: false,
    indexes: [
      {
        name: "idx_text",
        fields: ["text"],
      },
    ],
  }
);

const Comment = sequelize.define(
  "Comment",
  {
    // Model attributes are defined here
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: "user_id"
      // }
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Song,
        key: "song_id"
      }
    },
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Content,
        key: "content_id"
      }
    },
    time_stamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamps: false,
    indexes: [
      {
        name: "idx_user_id",
        fields: ["user_id"],
      },
      {
        name: "idx_song_id",
        fields: ["song_id"],
      },
      {
        name: "idx_content_id",
        fields: ["content_id"],
      },
      {
        name: "idx_time_stamp",
        fields: ["time_stamp"],
      },
    ],
  }
);

User.hasMany(Comment, {
  foreignKey: "user_id"
});
Comment.belongsTo(User, {
  foreignKey: "user_id"
});

// User.hasMany(Comments);
// Comment.hasOne();

// User.hasOne(Comment);
// User.hasMany(Comment);

module.exports = {
  User,
  Song,
  Content,
  Comment
};
