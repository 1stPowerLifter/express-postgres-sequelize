const { faker } = require('@faker-js/faker');
const { DEFAULT_COUNT } = process.env;

const arrOfRandomMails = () => {
  const randomMail = () => {
    return {
      email: faker.internet.email(),
      text: faker.lorem.words(10),
      subject: faker.lorem.words(10),
      html: `<h1>${faker.lorem.words(10)}</h1>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const arr = [];
  for (let i = 0; i < DEFAULT_COUNT; i++) {
    arr.push(randomMail());
  }
  return arr;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('mails', arrOfRandomMails(), {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('mails', null, {});
  },
};
