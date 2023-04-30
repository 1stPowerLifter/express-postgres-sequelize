const { Post, Tag, User, Category } = require('../models');

class PostsRepositories {
  async add(data) {
    return Post.create(data);
  }

  async getAll(attr = {}) {
    return Post.findAll(attr);
  }

  async getAllByUserId(userId) {
    return Post.findAll({ where: { userId } });
  }

  async getAllByCategory(categoryId) {
    return Post.findAll({ where: { categoryId }, include: User });
  }

  async getAllByUserCategory(categoryId, userId) {
    return Post.findAll({ where: { categoryId, userId } });
  }

  async getOneByIdAndUserId(id, userId) {
    return Post.findOne({
      where: { id, userId },
      include: [
        {
          model: Category,
        },
        {
          model: User,
        },
        {
          model: Tag,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async getOneByUserIdAndTitle({ title, userId }) {
    return Post.findOne({
      where: { title, userId },
      include: [
        {
          model: Category,
        },
        {
          model: User,
        },
        {
          model: Tag,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async getOneById(id) {
    return Post.findOne({
      where: { id },
      include: [
        {
          model: Category,
        },
        {
          model: User,
        },
        {
          model: Tag,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async updateById(data, id) {
    return Post.update(data, { where: { id } });
  }

  async removeById(id) {
    return Post.destroy({ where: { id } });
  }

  async removeByUserId(userId) {
    return Post.destroy({ where: { userId } });
  }
}

module.exports = new PostsRepositories();
