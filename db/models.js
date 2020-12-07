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

module.exports = {
  User,
  Song,
  Content,
};
