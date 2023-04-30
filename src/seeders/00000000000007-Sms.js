const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT } = process.env;

const arrOfRandomSms = () => {
  const randomSms = () => {
    return {
      phoneNumber: faker.phone.number('+380#########'),
      message: faker.lorem.words(10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < DEFAULT_COUNT; i++) {
    arr.push(randomSms());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sms', arrOfRandomSms(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sms', null, {});
  },
};
