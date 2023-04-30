const RolesServices = require('../services/rolesServices');
const RolesRepositories = require('../repositories/rolesRepositories');
const UsersRepositories = require('../repositories/usersRepositories');
const commonTestingUtils = require('./commonTestingUtils');

const userRole = commonTestingUtils.randomRoleDb('USER');
const adminRole = commonTestingUtils.randomRoleDb('ADMIN');

jest.mock(`../repositories/rolesRepositories`);
jest.mock(`../repositories/usersRepositories`);

describe('RolesServices testing', () => {
  describe('RolesServices.getAll', () => {
    test('getAll', async () => {
      RolesRepositories.getAll.mockResolvedValue([userRole, adminRole]);

      const result = await RolesServices.getAll();
      expect(result).toEqual([userRole, adminRole]);
    });
  });

  describe('RolesServices.getOneById', () => {
    test('true getOneById', async () => {
      RolesRepositories.getOneById.mockResolvedValue(adminRole);

      const result = await RolesServices.getOneById(adminRole.id);
      expect(result).toEqual(adminRole);
    });

    test('false getOneById', async () => {
      RolesRepositories.getOneById.mockResolvedValue(null);

      await expect(RolesServices.getOneById(0)).rejects.toThrowError(`Role with id 0 not found`);
    });
  });

  describe('RolesServices.add', () => {
    test('true add', async () => {
      const godRole = commonTestingUtils.randomRoleDb('GOD');
      RolesRepositories.getOneByRole.mockResolvedValue(null);
      RolesRepositories.add.mockResolvedValue(godRole);

      const result = await RolesServices.add(godRole.role);
      expect(result).toEqual(godRole);
    });

    test('false add', async () => {
      RolesRepositories.getOneByRole.mockResolvedValue(adminRole);

      await expect(RolesServices.add(adminRole)).rejects.toThrowError(`Role ${adminRole.role} already exists`);
    });
  });

  describe('RolesServices.updateById', () => {
    test('true updateById', async () => {
      RolesRepositories.updateById.mockResolvedValue(1);

      const result = await RolesServices.updateById(adminRole, adminRole.id);
      expect(result).toBe(`Role with id ${adminRole.id} update`);
    });

    test('false updateById', async () => {
      RolesRepositories.updateById.mockResolvedValue(0);

      await expect(RolesServices.updateById({ role: null }, 0)).rejects.toThrowError(`Role with id 0 not found`);
    });
  });

  describe('RolesServices.removeById', () => {
    test('true removeById whithout Users', async () => {
      RolesRepositories.getOneById.mockResolvedValue(adminRole);
      RolesRepositories.removeById.mockResolvedValue();

      const result = await RolesServices.removeById(adminRole.id);
      expect(result).toBe(`Role id ${adminRole.id} has been deleted`);
    });

    test('true removeById whith Users', async () => {
      adminRole.addUsers([{ dataValues: { id: 1 } }, { dataValues: { id: 2 } }]);
      RolesRepositories.getOneById.mockResolvedValue(adminRole);
      UsersRepositories.updateById.mockResolvedValue();
      RolesRepositories.removeById.mockResolvedValue();

      const result = await RolesServices.removeById(adminRole.id);
      expect(result).toBe(`Role id ${adminRole.id} has been deleted`);
      expect(UsersRepositories.updateById).toHaveBeenCalledTimes(2);
      expect(adminRole.Users).toHaveLength(2);
    });

    test('false removeById', async () => {
      RolesRepositories.getOneById.mockResolvedValue(null);

      await expect(RolesServices.removeById(0)).rejects.toThrowError(`Role with id 0 not found`);
    });
  });
});
