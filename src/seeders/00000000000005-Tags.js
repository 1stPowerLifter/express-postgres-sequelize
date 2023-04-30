const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT_OF_TAGS } = process.env;

const arrOfRandomTags = (count = DEFAULT_COUNT_OF_TAGS) => {
  const randomTag = () => {
    return {
      name: faker.word.noun(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < Math.ceil(count < 0 ? 0 : count); i++) {
    arr.push(randomTag());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tags', arrOfRandomTags(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
