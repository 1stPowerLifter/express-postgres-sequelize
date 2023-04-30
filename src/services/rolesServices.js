const { RolesRepositories, UsersRepositories } = require('../repositories');

class RolesServices {
  async getAll() {
    return await RolesRepositories.getAll();
  }

  async getOneById(id) {
    const role = await RolesRepositories.getOneById(id);
    if (role) return role;
    const error = new Error(`Role with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async add({ role }) {
    const oldCategory = await RolesRepositories.getOneByRole(role);
    if (!oldCategory) return RolesRepositories.add(role);
    const error = new Error(`Role ${role} already exists`);
    error.status = 404;
    throw error;
  }

  async updateById({ role }, id) {
    const result = await RolesRepositories.updateById(role, id);
    if (result) return `Role with id ${id} update`;
    const error = new Error(`Role with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async removeById(id) {
    const result = await RolesRepositories.getOneById(id);
    if (result) {
      if (result.Users.length !== 0) {
        for (let i = 0; i < result.Users.length; i++) {
          await UsersRepositories.updateById({ roleId: 1 }, result.Users[i].dataValues.id);
        }
      }
      await RolesRepositories.removeById(id);
      return `Role id ${id} has been deleted`;
    }
    const error = new Error(`Role with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

module.exports = new RolesServices();
