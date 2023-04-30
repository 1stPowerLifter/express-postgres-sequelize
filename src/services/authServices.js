const bcrypt = require('bcryptjs');
const axios = require('axios');
const qs = require('qs');

const UsersServices = require('./usersServices');
const { UsersRepositories } = require('../repositories');
const { AuthTokenHelper } = require('../utils');
const { userSchemas } = require('../schemas');
const SmsVerificationServices = require('./smsVerificationServices');

const {
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  GOOGLE_OAUTH_REDIRECT_URI = '',
  GOOGLE_CLIENT_ORIGIN = 'google',
  FB_CLIENT_ID = '',
  FB_CLIENT_SECRET = '',
  FB_OAUTH_REDIRECT_URI = '',
  FB_CLIENT_ORIGIN = 'facebook',
} = process.env;

class AuthServices {
  async register({ email, phoneNumber, ...arg }) {
    const oldUser = await UsersRepositories.getOne({ where: { email } });
    if (oldUser) {
      const error = new Error(`User whith email:${email} already exists`);
      error.status = 409;
      throw error;
    }
    const verified = await SmsVerificationServices.isVerifiedNumber(phoneNumber);
    if (verified !== 'true') {
      const error = new Error(`Not verifid phone number`);
      error.status = 409;
      throw error;
    }

    await SmsVerificationServices.deleteOTP(phoneNumber);
    return await UsersServices.add({ email, phoneNumber, ...arg });
  }

  async login({ email, password }) {
    const realUser = await UsersRepositories.getOne({ where: { email } });
    if (!realUser || !(await bcrypt.compare(password, realUser.password))) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }
    const tokens = AuthTokenHelper.getTokens({ id: realUser.id });
    await UsersServices.updateById({ token: tokens.refreshToken }, realUser.id);
    return tokens;
  }

  async refresh({ refreshToken }) {
    const { id } = AuthTokenHelper.verifyRt(refreshToken);
    const user = await UsersRepositories.getOneById(id);
    if (!user || user.token !== refreshToken) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    const tokens = AuthTokenHelper.getTokens({ id });
    await UsersServices.updateById({ token: tokens.refreshToken }, id);
    return tokens;
  }

  async logout(id) {
    await UsersRepositories.updateById({ token: null }, id);
  }

  async getGoogleOAuthTokens(code) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code',
    };
    const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    return axios.post(url, qs.stringify(values), headers);
  }

  async getGoogleUsers({ id_token, token_type, access_token }) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    const headers = { headers: { Autorization: [token_type, id_token].join(' ') } };
    const { data: gooogleUser } = await axios.get(url, headers);
    return {
      email: gooogleUser.email,
      firstName: gooogleUser.given_name,
      lastName: gooogleUser.family_name,
      origin: GOOGLE_CLIENT_ORIGIN,
    };
  }

  async getFacebookOAuthTokens(code) {
    const url = 'https://graph.facebook.com/v16.0/oauth/access_token';
    const values = {
      code,
      client_id: FB_CLIENT_ID,
      client_secret: FB_CLIENT_SECRET,
      redirect_uri: FB_OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code',
    };
    const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    return axios.post(url, qs.stringify(values), headers);
  }

  async getFacebookUsers({ access_token }) {
    const url = `https://graph.facebook.com/me?access_token=${access_token}&fields=email,name`;
    const {
      data: { name, email },
    } = await axios.get(url);
    if (!email) {
      const error = new Error('Facebook account is not email verified');
      error.status = 403;
      throw error;
    }
    const [firstName, lastName] = name.split(' ');
    return {
      email,
      firstName,
      lastName,
      origin: FB_CLIENT_ORIGIN,
    };
  }

  async getFacebookOrGoogleUserTokens(data) {
    const { error } = userSchemas.userGoogleOrFacebook.validate(data);
    if (error) {
      error.status = 422;
      throw error;
    }
    let user = await UsersRepositories.getOneByEmail(data.email);
    if (user) {
      await UsersRepositories.updateByEmail(data, data.email);
    } else {
      user = await UsersRepositories.add(data);
    }
    const tokens = AuthTokenHelper.getTokens({ id: user.id });
    await UsersServices.updateById({ token: tokens.refreshToken }, user.id);
    return tokens;
  }

  async verificationNumber({ phoneNumber }) {
    await SmsVerificationServices.startVerificationOTP(phoneNumber);
  }

  async verifyOTP({ phoneNumber, OTP }) {
    const resalt = await SmsVerificationServices.verifyOTP(phoneNumber, OTP);
    if (resalt) {
      await SmsVerificationServices.saveTrueOTP(phoneNumber);
      return `Verification of the user with phoneNumber ${phoneNumber} by number is successful. Congratulations!`;
    }
    const error = new Error('Invalid OTP code');
    error.status = 400;
    throw error;
  }
}

module.exports = new AuthServices();
