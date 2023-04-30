const { Op } = require('sequelize');
const { Sms } = require('../models');

class SmsRepositories {
  async getAll(attr = {}) {
    return Sms.findAll(attr);
  }

  async getOneById(id) {
    return Sms.findOne({ where: { id } });
  }

  async getOneByPhoneNumber(phoneNumber) {
    return Sms.findOne({ where: { phoneNumber } });
  }

  async getOneBySomeText(text) {
    return Sms.findOne({
      where: {
        message: {
          [Op.like]: `%${text}%`,
        },
      },
    });
  }

  async add(data) {
    return Sms.create(data);
  }

  async removeById(id) {
    return Sms.destroy({ where: { id } });
  }

  async removeByPhoneNumber(phoneNumber) {
    return Sms.destroy({ where: { phoneNumber } });
  }
}

module.exports = new SmsRepositories();
