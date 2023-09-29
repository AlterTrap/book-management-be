const dataTypes = require('sequelize/lib/data-types');
const { connection } = require('../utils/dbConnection');
const { DataTypes, Sequelize } = require('sequelize');

const Book = connection.define(
  'Book',
  {
    username: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    address: DataTypes.STRING,
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
