module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'token', { type: Sequelize.STRING });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('users', 'token');
  },
};
