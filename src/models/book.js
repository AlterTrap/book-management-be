const { connection } = require('../utils/dbConnection');
const { DataTypes } = require('sequelize');

const Book = connection.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
    },
    category: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Book };
