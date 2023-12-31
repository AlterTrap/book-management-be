require('dotenv').config(); // this is important!
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'admin',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'admin',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
