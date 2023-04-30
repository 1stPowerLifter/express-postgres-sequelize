const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT } = process.env;

const arrOfRandomCategories = () => {
  const randomCategory = () => {
    return {
      name: faker.word.noun(),
      description: faker.lorem.words(10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < DEFAULT_COUNT; i++) {
    arr.push(randomCategory());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', arrOfRandomCategories(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
