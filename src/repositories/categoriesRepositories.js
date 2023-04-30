const { Category, Post } = require('../models');

class CategoriesRepositories {
  async getAll(attr = {}) {
    return Category.findAll(attr);
  }

  async getOneById(id) {
    return Category.findOne({
      where: { id },
      include: Post,
    });
  }

  async getOneByCategory(name) {
    return Category.findOne({
      where: { name },
      include: Post,
    });
  }

  async add(category) {
    return Category.create(category);
  }

  async updateById(category, id) {
    return Category.update(category, { where: { id } });
  }

  async removeById(id) {
    return Category.destroy({ where: { id } });
  }
}

module.exports = new CategoriesRepositories();
