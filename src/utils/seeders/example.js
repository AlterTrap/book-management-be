const { faker } = require("@faker-js/faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Examples", [
      {
        name: faker.internet.displayName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
<<<<<<< HEAD
    return queryInterface.bulkDelete("Examples", null, {});
=======
    return queryInterface.bulkDelete('Examples', null, {});
>>>>>>> main
  },
};
