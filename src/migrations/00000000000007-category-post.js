module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('posts', 'categoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('posts', 'categoryId');
  },
};
