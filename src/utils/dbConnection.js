const { Sequelize } = require('sequelize');

let sequelize = null;

const getConnection = () => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(
    process.env.DEV_DB_NAME,
    process.env.DEV_DB_USERNAME,
    process.env.DEV_DB_PASSWORD,
    {
      host: process.env.HOST,
      dialect: 'mysql',
    }
  );

  return sequelize;
};

module.exports = { connection: getConnection() };
