const sequelize = require("./connect.js");
const { DataTypes } = require("sequelize");

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
    timestamps: false,
    indexes: [
      {
        name: "idx_system_number",
        fields: ["system_number"],
      },
    ],
  }
);

module.exports = {
  User,
};
