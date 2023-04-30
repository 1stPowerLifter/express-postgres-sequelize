const { PostsRepositories, CategoriesRepositories, TagsRepositories } = require('../repositories');

class PostsServices {
  async add({ title, category, content, userId, tags }) {
    const oldPost = await PostsRepositories.getOneByUserIdAndTitle({ title, userId });
    if (oldPost) {
      const error = new Error(`A post with the title ${title} already exists`);
      error.status = 404;
      throw error;
    }

    const newPost = { title, content, userId };

    if (category) {
      const postCategory = await CategoriesRepositories.getOneByCategory(category);
      if (postCategory) {
        newPost.categoryId = postCategory.id;
      } else {
        const error = new Error(`${category} category not found`);
        error.status = 404;
        throw error;
      }
    }

    const post = await PostsRepositories.add(newPost);

    if (tags && tags.length > 0) {
      const existingTags = await TagsRepositories.getByNames(tags);
      const arrForFilter = existingTags.map((tag) => tag.dataValues.name);
      const newTagsNames = tags.filter((tag) => !arrForFilter.includes(tag));
      const newTags = await TagsRepositories.addTags(newTagsNames.map((tag) => ({ name: tag })));
      await post.addTags([...existingTags, ...newTags]);
    }
    return post;
  }

  async getAll() {
    return await PostsRepositories.getAll();
  }

  async getUserAll(userId) {
    return PostsRepositories.getAllByUserId(userId);
  }

  async getAllByCategory(category) {
    let trueCategory = {};
    category !== 'null'
      ? (trueCategory = await CategoriesRepositories.getOneByCategory(category))
      : (trueCategory.id = null);
    if (trueCategory) return PostsRepositories.getAllByCategory(trueCategory.id);
    const error = new Error(`The category "${category}" does not exist`);
    error.status = 400;
    throw error;
  }

  async getAllByUserCategory(category, userId) {
    let trueCategory = {};
    category !== 'null'
      ? (trueCategory = await CategoriesRepositories.getOneByCategory(category))
      : (trueCategory.id = null);
    if (trueCategory) return PostsRepositories.getAllByUserCategory(trueCategory.id, userId);
    const error = new Error(`The category "${category}" does not exist`);
    error.status = 400;
    throw error;
  }

  async getById(id) {
    const post = await PostsRepositories.getOneById(id);
    if (post) return post;
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async updateById({ title, category, content, userId, id, tags }) {
    const post = await PostsRepositories.getOneByIdAndUserId(id, userId);
    if (!post) {
      const error = new Error(`You don't have a post with id ${id}`);
      error.status = 400;
      throw error;
    }
    const updatePost = {};
    if (title) updatePost.title = title;
    if (content) updatePost.content = content;
    if (category) {
      const postCategory = await CategoriesRepositories.getOneByCategory(category);
      if (postCategory) {
        updatePost.categoryId = postCategory.id;
      } else {
        const error = new Error(`${category} category not found`);
        error.status = 404;
        throw error;
      }
    }

    if (tags) {
      const existingTags = await TagsRepositories.getByNames(tags);
      const arrForFilter = existingTags.map((tag) => tag.dataValues.name);
      const newTagsNames = tags.filter((tag) => !arrForFilter.includes(tag));
      const newTags = await TagsRepositories.addTags(newTagsNames.map((tag) => ({ name: tag })));
      await post.setTags([...existingTags, ...newTags]);
    }

    await PostsRepositories.updateById(updatePost, id);
    return `Post with id ${id} update`;
  }

  async removeById(id, userId) {
    const post = await PostsRepositories.getOneByIdAndUserId(id, userId);

    if (!post) {
      const error = new Error(`You don't have a post with id ${id}`);
      error.status = 400;
      throw error;
    }
    await post.setTags([]);
    await PostsRepositories.removeById(id);
    return `Post with id ${id} has been deleted`;
  }
}

module.exports = new PostsServices();
