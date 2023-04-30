const Joi = require('joi');
const { GOOGLE_CLIENT_ORIGIN = 'google', FB_CLIENT_ORIGIN = 'facebook' } = process.env;

const user = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[+][3][8][0]\d{9}$/)
    .required(),
  password: Joi.string().min(4).max(20).required(),
  role: Joi.string(),
});

const userUpdate = Joi.object({
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  role: Joi.string(),
});

const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

const userRefresh = Joi.object({
  refreshToken: Joi.string().required(),
});

const userGoogleOrFacebook = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  origin: Joi.string().valid(GOOGLE_CLIENT_ORIGIN, FB_CLIENT_ORIGIN).required(),
});

const userPasswords = Joi.object({
  newPassword: Joi.string().min(4).max(20).required(),
  repeatNewPassword: Joi.string().min(4).max(20).required(),
  oldPassword: Joi.string().min(4).max(20).required(),
});

const userPhoneNumber = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[+][3][8][0]\d{9}$/)
    .required(),
});

const userOtp = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[+][3][8][0]\d{9}$/)
    .required(),
  OTP: Joi.string().length(6).pattern(/^\d+$/).required(),
});

module.exports = {
  userRefresh,
  userUpdate,
  userLogin,
  user,
  userGoogleOrFacebook,
  userPasswords,
  userPhoneNumber,
  userOtp,
};
