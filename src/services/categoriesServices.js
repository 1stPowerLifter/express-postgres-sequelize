const { CategoriesRepositories } = require('../repositories');

class CategoriesServices {
  async getAll() {
    return CategoriesRepositories.getAll();
  }

  async getOneById(id) {
    const category = await CategoriesRepositories.getOneById(id);
    if (category) return category;
    const error = new Error(`Category with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async add(category) {
    const oldCategory = await CategoriesRepositories.getOneByCategory(category.name);
    if (!oldCategory) return CategoriesRepositories.add(category);
    const error = new Error(`Category with the name ${category.name} already exists`);
    error.status = 404;
    throw error;
  }

  async updateById(category, id) {
    if (category.name) {
      const oldCategory = await CategoriesRepositories.getOneByCategory(category.name);
      if (oldCategory && oldCategory.id !== id) {
        const error = new Error(`Category with the name ${category.name} already exists`);
        error.status = 404;
        throw error;
      }
    }
    const result = await CategoriesRepositories.updateById(category, id);
    if (result) return `Category with id ${id} update`;
    const error = new Error(`Category with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async removeById(id) {
    const category = await CategoriesRepositories.getOneById(id);
    if (category) {
      category.setPosts([]);
      await CategoriesRepositories.removeById(id);
      return `Category id ${id} has been deleted`;
    }
    const error = new Error(`Category with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

module.exports = new CategoriesServices();
