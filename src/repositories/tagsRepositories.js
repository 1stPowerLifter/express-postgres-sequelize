const { Op } = require('sequelize');
const { Post, Tag } = require('../models');

class TagsRepositories {
  async add(data) {
    return Tag.create(data);
  }

  async addTags(data) {
    return Tag.bulkCreate(data);
  }

  async getAll(attr = {}) {
    return Tag.findAll(attr);
  }

  async getByNames(names) {
    return Tag.findAll({
      where: {
        name: {
          [Op.in]: names,
        },
      },
    });
  }

  async getOneByName(name) {
    return Tag.findOne({ where: { name } });
  }

  async getOneById(id) {
    return Tag.findOne({
      where: { id },
      include: {
        model: Post,
        through: {
          attributes: [],
        },
      },
    });
  }

  async removeById(id) {
    return Tag.destroy({ where: { id } });
  }
}

module.exports = new TagsRepositories();
