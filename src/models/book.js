const dataTypes = require('sequelize/lib/data-types');
const { connection } = require('../utils/dbConnection');
const { DataTypes, Sequelize } = require('sequelize');

const Book = connection.define(
  'Book',
  {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
  }
);

module.exports = { Book };
