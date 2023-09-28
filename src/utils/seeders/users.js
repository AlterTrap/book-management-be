const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const models = [];

    // Create sample user data with hashed passwords
    for (let i = 0; i < 10; i++) {
      const username = faker.internet.userName();
      const password = await bcrypt.hash(faker.internet.password(), 10); // Hash the password

      models.push({
        username: username,
        password: password,
        name: faker.lorem.words(3),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Users', models);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
