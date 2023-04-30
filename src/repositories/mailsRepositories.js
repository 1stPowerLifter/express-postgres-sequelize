const { Op } = require('sequelize');
const { Mail } = require('../models');

class MailsRepositories {
  async getAll(attr = {}) {
    return Mail.findAll(attr);
  }

  async getOneById(id) {
    return Mail.findOne({ where: { id } });
  }

  async getOneByPhoneNumber(phoneNumber) {
    return Mail.findOne({ where: { phoneNumber } });
  }

  async getOneBySomeText(text) {
    return Mail.findOne({
      where: {
        message: {
          [Op.like]: `%${text}%`,
        },
      },
    });
  }

  async add(data) {
    return Mail.create(data);
  }

  async addMails(data) {
    return Mail.bulkCreate(data);
  }

  async removeById(id) {
    return Mail.destroy({ where: { id } });
  }

  async removeByEmail(email) {
    return Mail.destroy({ where: { email } });
  }
}

module.exports = new MailsRepositories();
