const { User, Role, Post } = require('../models');

class UsersRepositories {
  async add(newUser) {
    return User.create(newUser);
  }

  async getAll(attr = {}) {
    return User.findAll(attr);
  }

  async getOne(attr = {}) {
    attr.include = [Role, Post];
    return User.findOne(attr);
  }

  async getOneById(id) {
    return User.findOne({ where: { id }, include: [Role, Post] });
  }

  async getOneByEmail(email) {
    return User.findOne({ where: { email }, include: [Role, Post] });
  }

  async updateById(data, id) {
    return User.update(data, { where: { id } });
  }

  async updateByEmail(data, email) {
    return User.update(data, { where: { email } });
  }

  async remove(attr) {
    return User.destroy(attr);
  }

  async removeById(id) {
    return User.destroy({
      where: { id: id },
    });
  }
}

module.exports = new UsersRepositories();
