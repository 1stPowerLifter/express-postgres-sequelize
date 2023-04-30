const { Role, User } = require('../models');

class RolesRepositories {
  async getAll(attr = {}) {
    return Role.findAll(attr);
  }

  async getOneByRole(role) {
    return Role.findOne({ where: { role } });
  }

  async getOneById(id) {
    return Role.findOne({
      where: { id },
      include: User,
    });
  }

  async add(role) {
    return Role.create({ role });
  }

  async updateById(role, id) {
    return Role.update({ role }, { where: { id } });
  }

  async removeById(id) {
    return Role.destroy({ where: { id } });
  }
}

module.exports = new RolesRepositories();
