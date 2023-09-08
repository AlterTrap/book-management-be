const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const models = [];

    for (let i = 0; i < 10; i++) {
      models.push({
        name: faker.lorem.words(3),
        category: 'novel',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Books', models);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
