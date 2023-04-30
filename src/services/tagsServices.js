const { TagsRepositories } = require('../repositories');

class TagsServices {
  async add({ name }) {
    const oldPost = await TagsRepositories.getOneByName(name);
    if (oldPost) {
      const error = new Error(`Tag with the name ${name} already exists`);
      error.status = 404;
      throw error;
    }
    return await TagsRepositories.add({ name });
  }

  async getAll() {
    return TagsRepositories.getAll();
  }

  async getById(id) {
    const tag = await TagsRepositories.getOneById(id);
    if (tag) return tag;
    const error = new Error(`Tag with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async removeById(id) {
    const tag = await TagsRepositories.getOneById(id);
    if (tag) {
      await tag.setPosts([]);
      await TagsRepositories.removeById(id);
      return `Tag with id ${id} has been deleted`;
    }
    const error = new Error(`Tag with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

module.exports = new TagsServices();
