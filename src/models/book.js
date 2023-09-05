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
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Book };
