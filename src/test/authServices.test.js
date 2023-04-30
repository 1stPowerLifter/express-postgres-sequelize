const axios = require('axios');
const bcrypt = require('bcryptjs');
const AuthServices = require('../services/authServices');
const SmsVerificationServices = require('../services/smsVerificationServices');
const UsersServices = require('../services/usersServices');
const UsersRepositories = require('../repositories/usersRepositories');
const AuthTokenHelper = require('../utils/AuthTokenHelper');
const userSchemas = require('../schemas/userSchema');
const commonTestingUtils = require('./commonTestingUtils');
const { GOOGLE_CLIENT_ORIGIN = 'google', FB_CLIENT_ORIGIN = 'facebook' } = process.env;

const userReg = commonTestingUtils.randomUser();
const user = commonTestingUtils.randomUserDb(userReg);

jest.mock('../services/usersServices');
jest.mock(`../services/smsVerificationServices`);
jest.mock(`../repositories/usersRepositories`);
jest.mock('../utils/AuthTokenHelper');
jest.mock(`axios`);
jest.mock(`bcryptjs`);
jest.mock(`../schemas/userSchema`);

describe('AuthServices testing', () => {
  describe('AuthServices.register testing', () => {
    test('true register', async () => {
      UsersRepositories.getOne.mockResolvedValue(null);
      SmsVerificationServices.isVerifiedNumber.mockResolvedValue('true');
      SmsVerificationServices.deleteOTP.mockResolvedValue();
      UsersServices.add.mockResolvedValue(user);

      const result = await AuthServices.register(userReg);
      expect(result).toEqual(user);
    });

    it('false register with old user', async () => {
      UsersRepositories.getOne.mockResolvedValue(true);

      await expect(AuthServices.register(userReg)).rejects.toThrowError(
        `User whith email:${userReg.email} already exists`,
      );
      expect(UsersRepositories.getOne).toHaveBeenCalled();
    });

    it('false register with not verification number', async () => {
      UsersRepositories.getOne.mockResolvedValue(false);
      SmsVerificationServices.isVerifiedNumber.mockResolvedValue('0');

      await expect(AuthServices.register(userReg)).rejects.toThrowError(`Not verifid phone number`);
      expect(SmsVerificationServices.isVerifiedNumber).toHaveBeenCalled();
      expect(UsersRepositories.getOne).toHaveBeenCalled();
    });
  });

  describe('AuthServices.login testing', () => {
    test('true login', async () => {
      UsersRepositories.getOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      UsersServices.updateById.mockResolvedValue(true);
      AuthTokenHelper.getTokens.mockResolvedValue({
        accessToken: true,
        refreshToken: true,
      });

      const result = await AuthServices.login({ email: userReg.email, password: userReg.password });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(UsersServices.updateById).toHaveBeenCalled();
      expect(UsersRepositories.getOne).toHaveBeenCalled();
    });

    test('false login with invalid email', async () => {
      UsersRepositories.getOne.mockResolvedValue(null);

      await expect(AuthServices.login({ email: 'invalid', password: userReg.password })).rejects.toThrowError(
        'Invalid email or password',
      );
      expect(UsersRepositories.getOne).toHaveBeenCalled();
    });

    test('false login with invalid pass', async () => {
      UsersRepositories.getOne.mockResolvedValue({ password: userReg.password });
      bcrypt.compare.mockResolvedValue(false);

      await expect(AuthServices.login({ email: userReg.email, password: 'invalid' })).rejects.toThrowError(
        'Invalid email or password',
      );
      expect(UsersRepositories.getOne).toHaveBeenCalled();
    });
  });

  describe('AuthServices.refresh testing', () => {
    test('true refresh', async () => {
      UsersRepositories.getOneById.mockResolvedValue({ token: true });
      UsersServices.updateById.mockResolvedValue();
      AuthTokenHelper.verifyRt.mockReturnValue({ id: 1 });
      AuthTokenHelper.getTokens.mockReturnValue({
        accessToken: true,
        refreshToken: true,
      });

      const result = await AuthServices.refresh({ refreshToken: true });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(UsersServices.updateById).toHaveBeenCalled();
      expect(UsersRepositories.getOne).toHaveBeenCalled();
      expect(AuthTokenHelper.verifyRt).toHaveBeenCalled();
    });

    test('false refresh with invalid user', async () => {
      UsersRepositories.getOneById.mockResolvedValue(false);
      AuthTokenHelper.verifyRt.mockReturnValue({ id: 1 });

      await expect(AuthServices.refresh({ refreshToken: true })).rejects.toThrowError('Not authorized');
    });

    test('false refresh with invalid refreshToken', async () => {
      UsersRepositories.getOneById.mockResolvedValue({ token: false });
      AuthTokenHelper.verifyRt.mockReturnValue({ id: 1 });

      await expect(AuthServices.refresh({ refreshToken: true })).rejects.toThrowError('Not authorized');
    });
  });

  describe('AuthServices.logout testing', () => {
    test('true logout', async () => {
      UsersRepositories.updateById.mockResolvedValue();

      const result = await AuthServices.logout(user);
      expect(result).toBeUndefined();
    });
  });

  describe('AuthServices all google and facebook testing', () => {
    test('true getGoogleOAuthTokens', async () => {
      axios.post.mockResolvedValue({ data: { id_token: true, token_type: true, access_token: true } });

      const result = await AuthServices.getGoogleOAuthTokens('some code url');
      expect(result).toHaveProperty('data.id_token');
      expect(result).toHaveProperty('data.token_type');
      expect(result).toHaveProperty('data.access_token');
    });

    test('true getGoogleUsers', async () => {
      axios.get.mockResolvedValue({
        data: {
          ...user,
          origin: GOOGLE_CLIENT_ORIGIN,
          given_name: userReg.firstName,
          family_name: userReg.lastName,
        },
      });

      const result = await AuthServices.getGoogleUsers({ id_token: true, token_type: true, access_token: true });
      expect(result.email).toBe(userReg.email);
      expect(result.firstName).toBe(userReg.firstName);
      expect(result.lastName).toBe(userReg.lastName);
      expect(result.origin).toBe(GOOGLE_CLIENT_ORIGIN);
    });

    test('true getFacebookOAuthTokens', async () => {
      axios.post.mockResolvedValue({ data: { access_token: true } });

      const result = await AuthServices.getFacebookOAuthTokens('some code url');
      expect(result).toHaveProperty('data.access_token');
    });

    test('true getFacebookUsers', async () => {
      axios.get.mockResolvedValue({
        data: {
          name: `${userReg.firstName} ${userReg.lastName}`,
          email: userReg.email,
        },
      });

      const result = await AuthServices.getFacebookUsers({ access_token: true });
      expect(result.email).toBe(userReg.email);
      expect(result.firstName).toBe(userReg.firstName);
      expect(result.lastName).toBe(userReg.lastName);
      expect(result.origin).toBe(FB_CLIENT_ORIGIN);
    });

    test('false getFacebookUsers without email', async () => {
      axios.get.mockResolvedValue({
        data: {
          data: {
            name: `${userReg.firstName} ${userReg.lastName}`,
            email: null,
          },
        },
      });

      await expect(AuthServices.getFacebookUsers({ access_token: true })).rejects.toThrowError(
        'Facebook account is not email verified',
      );
    });

    test('true getFacebookOrGoogleUserTokens whith add user', async () => {
      userSchemas.userGoogleOrFacebook.validate.mockReturnValue({ error: false });
      UsersRepositories.getOneByEmail.mockResolvedValue(false);
      UsersRepositories.add.mockResolvedValue({ id: userReg.id });
      AuthTokenHelper.getTokens.mockReturnValue({ accessToken: true, refreshToken: true });
      UsersServices.updateById.mockResolvedValue();

      const result = await AuthServices.getFacebookOrGoogleUserTokens(userReg);
      expect(result.accessToken).toBe(true);
      expect(result.refreshToken).toBe(true);
    });

    test('true getFacebookOrGoogleUserTokens whith updateByEmail user', async () => {
      userSchemas.userGoogleOrFacebook.validate.mockReturnValue({ error: false });
      UsersRepositories.getOneByEmail.mockResolvedValue(true);
      UsersRepositories.updateByEmail.mockResolvedValue({ id: userReg.id });
      AuthTokenHelper.getTokens.mockReturnValue({ accessToken: true, refreshToken: true });
      UsersServices.updateById.mockResolvedValue();

      const result = await AuthServices.getFacebookOrGoogleUserTokens(userReg);
      expect(result.accessToken).toBe(true);
      expect(result.refreshToken).toBe(true);
    });

    test('false getFacebookOrGoogleUserTokens whith false validate', async () => {
      userSchemas.userGoogleOrFacebook.validate.mockReturnValue({ error: true });

      await expect(AuthServices.getFacebookOrGoogleUserTokens(userReg)).rejects.toThrowError();
    });
  });

  describe('AuthServices phone verification', () => {
    test('verificationNumber', async () => {
      SmsVerificationServices.startVerificationOTP.mockResolvedValue();

      await expect(AuthServices.verificationNumber({ phoneNumber: userReg.phoneNumber })).resolves.toBeUndefined();
    });

    test('true verifyOTP', async () => {
      SmsVerificationServices.verifyOTP.mockResolvedValue(true);
      SmsVerificationServices.saveTrueOTP.mockResolvedValue();

      const result = await AuthServices.verifyOTP({ phoneNumber: userReg.phoneNumber, OTP: '000000' });
      expect(result).toBe(
        `Verification of the user with phoneNumber ${userReg.phoneNumber} by number is successful. Congratulations!`,
      );
    });

    test('false verifyOTP', async () => {
      SmsVerificationServices.verifyOTP.mockResolvedValue(false);

      await expect(AuthServices.verifyOTP({ phoneNumber: userReg.phoneNumber, OTP: '000000' })).rejects.toThrowError(
        'Invalid OTP code',
      );
    });
  });
});
