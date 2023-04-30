const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT, DEFAULT_COUNT_OF_POSTS } = process.env;

const arrOfRandomPosts = (count = DEFAULT_COUNT_OF_POSTS) => {
  const randomPost = () => {
    return {
      title: faker.word.noun(),
      content: faker.lorem.words(20),
      userId: faker.datatype.number({ min: 1, max: DEFAULT_COUNT }),
      categoryId: faker.datatype.number({ min: 1, max: DEFAULT_COUNT }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < Math.ceil(count < 0 ? 0 : count); i++) {
    arr.push(randomPost());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('posts', arrOfRandomPosts(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
