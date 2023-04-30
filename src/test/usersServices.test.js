const bcrypt = require('bcryptjs');
const UsersServices = require('../services/usersServices');
const UsersRepositories = require('../repositories/usersRepositories');
const RolesRepositories = require('../repositories/rolesRepositories');
const PostsRepositories = require('../repositories/postsRepositories');
const saltPassword = require('../utils/saltPassword');
const commonTestingUtils = require('./commonTestingUtils');
const { DEFAULT_PASS = '1111' } = process.env;

const newAdmin = commonTestingUtils.randomUser('ADMIN');
const adminDb = commonTestingUtils.randomUserDb(newAdmin);
const user1 = commonTestingUtils.randomUserDb();
const user2 = commonTestingUtils.randomUserDb();

jest.mock(`../repositories/usersRepositories`);
jest.mock(`../repositories/rolesRepositories`);
jest.mock(`../repositories/postsRepositories`);
jest.mock(`../utils/saltPassword`);
jest.mock('bcryptjs');

describe('UsersServices testing', () => {
  describe('UsersServices.add', () => {
    test('true add', async () => {
      saltPassword.mockResolvedValue(DEFAULT_PASS);
      UsersRepositories.getOneByEmail.mockResolvedValue(null);
      RolesRepositories.getOneByRole.mockResolvedValue({ id: 2 });
      UsersRepositories.add.mockResolvedValue(adminDb);

      const result = await UsersServices.add(newAdmin);
      expect(result).toEqual(adminDb);
    });

    test('false add, oldUser', async () => {
      UsersRepositories.getOneByEmail.mockResolvedValue(adminDb);

      await expect(UsersServices.add(newAdmin)).rejects.toThrowError(
        `User with the email ${newAdmin.email} already exists`,
      );
    });
  });

  describe('UsersServices.getAll', () => {
    test('getAll', async () => {
      UsersRepositories.getAll.mockResolvedValue([user1, user2, adminDb]);

      const result = await UsersServices.getAll();
      expect(result).toEqual([user1, user2, adminDb]);
    });
  });

  describe('UsersServices.getById', () => {
    test('true getById', async () => {
      UsersRepositories.getOneById.mockResolvedValue(user1);

      const result = await UsersServices.getById(user1.id);
      expect(result).toEqual(user1);
    });

    test('false getById', async () => {
      UsersRepositories.getOneById.mockResolvedValue(null);

      await expect(UsersServices.getById(0)).rejects.toThrowError(`User with id 0 not found`);
    });
  });

  describe('UsersServices.setPassword', () => {
    test('true setPassword', async () => {
      bcrypt.compare.mockResolvedValue(true);
      saltPassword.mockResolvedValue(DEFAULT_PASS);
      UsersRepositories.updateById.mockResolvedValue([adminDb]);

      const result = await UsersServices.setPassword(
        { newPassword: DEFAULT_PASS + 1, repeatNewPassword: DEFAULT_PASS + 1, oldPassword: DEFAULT_PASS },
        adminDb,
      );
      expect(result).toBe(`User with id ${adminDb.id} update`);
    });

    test('false getById / new password does not differ from the old password', async () => {
      await expect(
        UsersServices.setPassword(
          { newPassword: DEFAULT_PASS, repeatNewPassword: DEFAULT_PASS, oldPassword: DEFAULT_PASS },
          adminDb,
        ),
      ).rejects.toThrowError(`The new password does not differ from the old password`);
    });

    test('false getById / bcrypt.compare', async () => {
      bcrypt.compare.mockResolvedValue(false);
      await expect(
        UsersServices.setPassword(
          { newPassword: DEFAULT_PASS + 1, repeatNewPassword: DEFAULT_PASS + 1, oldPassword: DEFAULT_PASS },
          adminDb,
        ),
      ).rejects.toThrowError(`The old password is incorrect`);
    });

    test('false getById / The passwords are not the same', async () => {
      bcrypt.compare.mockResolvedValue(true);
      await expect(
        UsersServices.setPassword(
          { newPassword: DEFAULT_PASS + 1, repeatNewPassword: DEFAULT_PASS + 2, oldPassword: DEFAULT_PASS },
          adminDb,
        ),
      ).rejects.toThrowError(`The passwords are not the same`);
    });

    test('true setPassword / user not found', async () => {
      bcrypt.compare.mockResolvedValue(true);
      saltPassword.mockResolvedValue(DEFAULT_PASS);
      UsersRepositories.updateById.mockResolvedValue([]);

      await expect(
        UsersServices.setPassword(
          { newPassword: DEFAULT_PASS + 1, repeatNewPassword: DEFAULT_PASS + 1, oldPassword: DEFAULT_PASS },
          { password: DEFAULT_PASS, id: 0 },
        ),
      ).rejects.toThrowError(`User with id 0 not found`);
    });
  });

  describe('UsersServices.updateById', () => {
    test('true updateById', async () => {
      RolesRepositories.getOneByRole.mockResolvedValue({ id: 2 });
      UsersRepositories.updateById.mockResolvedValue([adminDb]);

      const result = await UsersServices.updateById(newAdmin, adminDb.id);
      expect(result).toBe(`User with id ${adminDb.id} update`);
    });

    test('false updateById / by role', async () => {
      RolesRepositories.getOneByRole.mockResolvedValue(null);

      await expect(UsersServices.updateById({ role: 'null' }, adminDb.id)).rejects.toThrowError(`null role not found`);
    });

    test('false updateById / user not found', async () => {
      RolesRepositories.getOneByRole.mockResolvedValue({ id: 2 });
      UsersRepositories.updateById.mockResolvedValue([]);

      await expect(UsersServices.updateById(newAdmin, 0)).rejects.toThrowError(`User with id 0 not found`);
    });
  });

  describe('UsersServices.removeById', () => {
    test('true removeById', async () => {
      UsersRepositories.getOneById.mockResolvedValue(adminDb);
      PostsRepositories.getAllByUserId.mockResolvedValue([]);
      PostsRepositories.removeByUserId.mockResolvedValue();
      UsersRepositories.removeById.mockResolvedValue();

      const result = await UsersServices.removeById(adminDb.id);
      expect(result).toBe(`User id ${adminDb.id} has been deleted`);
    });

    test('false removeById / by role', async () => {
      UsersRepositories.getOneById.mockResolvedValue(null);

      await expect(UsersServices.removeById(0)).rejects.toThrowError(`User with id 0 not found`);
    });
  });
});
