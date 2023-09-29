const { connection } = require('../utils/dbConnection');
const { DataTypes } = require('sequelize');

const Users = connection.define('user', {
  userName: {
    type: DataTypes.STRING,
  },
  passWord: DataTypes.STRING,
});

module.exports = { Users };
