const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT_COUNT_OF_POSTTAGS, DEFAULT_COUNT_OF_POSTS, DEFAULT_COUNT_OF_TAGS } = process.env;

const arrOfRandomPostTags = (count = DEFAULT_COUNT_COUNT_OF_POSTTAGS) => {
  const randomPostTags = () => {
    return {
      postId: faker.datatype.number({ min: 1, max: DEFAULT_COUNT_OF_POSTS }),
      tagId: faker.datatype.number({ min: 1, max: DEFAULT_COUNT_OF_TAGS }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < Math.ceil(count < 0 ? 0 : count); i++) {
    arr.push(randomPostTags());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('post_tags', arrOfRandomPostTags(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('post_tags', null, {});
  },
};
