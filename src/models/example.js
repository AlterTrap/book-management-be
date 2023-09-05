const { connection } = require("../utils/dbConnection");
const { DataTypes } = require("sequelize");

const Example = connection.define("Example", {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = { Example };
