module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'origin', { type: Sequelize.ENUM('homepage', 'google', 'facebook') });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('users', 'origin');
  },
};
