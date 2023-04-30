const { faker } = require('@faker-js/faker');
const { saltPassword } = require('../utils');
const { DEFAULT_PASS, DEFAULT_COUNT } = process.env;

const arrOfRandomUsers = async () => {
  const password = await saltPassword(DEFAULT_PASS);
  const randomUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);
    return {
      firstName,
      lastName,
      email,
      password,
      phoneNumber: faker.phone.number('+380#########'),
      roleId: faker.helpers.arrayElement([1, 2]),
      origin: 'homepage',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < DEFAULT_COUNT; i++) {
    arr.push(randomUser());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', await arrOfRandomUsers(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
