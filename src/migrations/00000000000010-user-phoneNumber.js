module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'phoneNumber', { type: Sequelize.STRING });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('users', 'phoneNumber');
  },
};
