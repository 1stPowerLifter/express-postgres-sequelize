module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
