const bcrypt = require('bcryptjs');
const { UsersRepositories, RolesRepositories, PostsRepositories } = require('../repositories');
const { saltPassword } = require('../utils');

class UsersServices {
  async add({ role, email, firstName, lastName, password, phoneNumber }) {
    const oldUser = await UsersRepositories.getOneByEmail(email);
    if (oldUser) {
      const error = new Error(`User with the email ${email} already exists`);
      error.status = 409;
      throw error;
    }

    const hashPass = await saltPassword(password);
    const newUser = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password: hashPass,
    };

    if (role) {
      const userRole = await RolesRepositories.getOneByRole(role);
      if (userRole) {
        newUser.roleId = userRole.id;
      } else {
        const error = new Error(`${role} role not found`);
        error.status = 404;
        throw error;
      }
    }
    return await UsersRepositories.add(newUser);
  }

  async getAll() {
    return UsersRepositories.getAll();
  }

  async getById(id) {
    const user = await UsersRepositories.getOneById(id);
    if (user) return user;
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async setPassword({ newPassword, repeatNewPassword, oldPassword }, { password, id }) {
    if (oldPassword === newPassword) {
      const error = new Error(`The new password does not differ from the old password`);
      error.status = 400;
      throw error;
    }
    if (!(await bcrypt.compare(oldPassword, password))) {
      const error = new Error(`The old password is incorrect`);
      error.status = 400;
      throw error;
    }
    if (newPassword !== repeatNewPassword) {
      const error = new Error(`The passwords are not the same`);
      error.status = 400;
      throw error;
    }
    const hashPass = await saltPassword(newPassword);
    const [result] = await UsersRepositories.updateById({ password: hashPass }, id);
    if (result) return `User with id ${id} update`;
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async updateById(data, id) {
    if (data.role) {
      const userRole = await RolesRepositories.getOneByRole(data.role);
      if (userRole) {
        data.roleId = userRole.id;
      } else {
        const error = new Error(`${data.role} role not found`);
        error.status = 404;
        throw error;
      }
    }

    const [result] = await UsersRepositories.updateById(data, id);
    if (result) return `User with id ${id} update`;
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    throw error;
  }

  async removeById(id) {
    const user = await UsersRepositories.getOneById(id);
    if (user) {
      const posts = await PostsRepositories.getAllByUserId(id);
      for (let i = 0; i < posts.length; i++) {
        await posts[i].setTags([]);
      }
      await PostsRepositories.removeByUserId(id);
      await UsersRepositories.removeById(id);
      return `User id ${id} has been deleted`;
    }
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

module.exports = new UsersServices();
