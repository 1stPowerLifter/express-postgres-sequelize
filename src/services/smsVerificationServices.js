const { SmsRepositories } = require('../repositories');
const RedisServices = require('./redisServices');
const { TWILiO_ACCPUNT_SID = 'AC_testing', TWILiO_AUTH_TOKEN = 'testing', TWILIO_PHONE_NUMBER = '' } = process.env;
const twilioClient = require('twilio')(TWILiO_ACCPUNT_SID, TWILiO_AUTH_TOKEN);

class SmsVerificationServices {
  generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async sendOTP(phoneNumber, OTP) {
    const message = `Your OTP is ${OTP}. Please enter it to verify your account.`;
    await SmsRepositories.add({ phoneNumber, message });
    return await twilioClient.messages.create({
      to: phoneNumber,
      from: TWILIO_PHONE_NUMBER,
      body: message,
    });
  }

  async storeOTP(phoneNumber, OTP) {
    await RedisServices.hSet('OTP', phoneNumber, OTP);
  }

  async verifyOTP(phoneNumber, OTP) {
    const savedOTP = await RedisServices.hGet('OTP', phoneNumber);
    return +OTP === +savedOTP ? true : false;
  }

  async startVerificationOTP(phoneNumber) {
    const OTP = this.generateOTP();
    await this.sendOTP(phoneNumber, OTP);
    await this.storeOTP(phoneNumber, OTP);
  }

  async saveTrueOTP(phoneNumber) {
    await RedisServices.hSet('OTP', phoneNumber, 'true');
  }

  async isVerifiedNumber(phoneNumber) {
    return await RedisServices.hGet('OTP', phoneNumber);
  }

  async deleteOTP(phoneNumber) {
    await RedisServices.hDelete('OTP', phoneNumber);
  }
}

module.exports = new SmsVerificationServices();
