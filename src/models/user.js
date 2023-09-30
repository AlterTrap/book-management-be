const dataTypes = require('sequelize/lib/data-types');
const { connection } = require('../utils/dbConnection');
const { DataTypes, Sequelize } = require('sequelize');

const User = connection.define(
  'User',
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
    address: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
  }
);

module.exports = { User };
