const dataTypes = require('sequelize/lib/data-types');
const { connection } = require('../utils/dbConnection');
const { DataTypes, Sequelize } = require('sequelize');
const User = require('../models/user');

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

// User.hasMany(Book, { as: 'books', foreignKey: 'userId' });
// Book.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Book };
