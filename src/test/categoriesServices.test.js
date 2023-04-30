const CategoriesServices = require('../services/categoriesServices');
const CategoriesRepositories = require('../repositories/categoriesRepositories');
const commonTestingUtils = require('./commonTestingUtils');

const category1 = commonTestingUtils.randomCategoryDb();
const category2 = commonTestingUtils.randomCategoryDb();
const category3 = commonTestingUtils.randomCategoryDb();
const arrCategories = [category1, category2, category3];
const newCategory = commonTestingUtils.randomCategory();
const newCategoryDb = commonTestingUtils.randomCategoryDb(newCategory);

jest.mock(`../repositories/categoriesRepositories`);

describe('CategoriesServices testing', () => {
  describe('CategoriesServices.getAll', () => {
    test('getAll', async () => {
      CategoriesRepositories.getAll.mockResolvedValue(arrCategories);

      const result = await CategoriesServices.getAll();
      expect(result).toEqual(arrCategories);
    });
  });

  describe('CategoriesServices.getOneById', () => {
    test('true getOneById', async () => {
      CategoriesRepositories.getOneById.mockResolvedValue(category1);

      const result = await CategoriesServices.getOneById(category1.id);
      expect(result.id).toBe(category1.id);
      expect(result.name).toBe(category1.name);
      expect(result.description).toBe(category1.description);
      expect(result.createdAt).toBe(category1.createdAt);
      expect(result.updatedAt).toBe(category1.updatedAt);
    });

    test('falsr getOneById', async () => {
      CategoriesRepositories.getOneById.mockResolvedValue(null);

      await expect(CategoriesServices.getOneById(category1.id)).rejects.toThrowError(
        `Category with id ${category1.id} not found`,
      );
    });
  });

  describe('CategoriesServices.add', () => {
    test('true add', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);
      CategoriesRepositories.add.mockResolvedValue(newCategoryDb);

      const result = await CategoriesServices.add(newCategory);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.name).toBe(newCategory.name);
      expect(result.description).toBe(newCategory.description);
    });

    test('false getOneById', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category1);

      await expect(CategoriesServices.add(category1)).rejects.toThrowError(
        `Category with the name ${category1.name} already exists`,
      );
    });
  });

  describe('CategoriesServices.updateById', () => {
    test('true updateById whith not found oldCategory', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);
      CategoriesRepositories.updateById.mockResolvedValue({ ...category1, ...newCategory, updatedAt: new Date() });

      const result = await CategoriesServices.updateById(newCategory, category1.id);
      expect(result).toBe(`Category with id ${category1.id} update`);
    });

    test('true updateById whith oldCategory', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue({ name: newCategory.name, id: category1.id });
      CategoriesRepositories.updateById.mockResolvedValue({ ...category1, ...newCategory, updatedAt: new Date() });

      const result = await CategoriesServices.updateById(newCategory, category1.id);
      expect(result).toBe(`Category with id ${category1.id} update`);
    });

    test('false updateById whith oldCategory', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue({ name: newCategory.name, id: category2.id });

      await expect(CategoriesServices.updateById(newCategory, category1.id)).rejects.toThrowError(
        `Category with the name ${newCategory.name} already exists`,
      );
    });

    test('false updateById not found', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);
      CategoriesRepositories.updateById.mockResolvedValue(null);

      await expect(CategoriesServices.updateById(newCategory, category1.id)).rejects.toThrowError(
        `Category with id ${category1.id} not found`,
      );
    });
  });

  describe('CategoriesServices.removeById', () => {
    test('true removeById', async () => {
      CategoriesRepositories.getOneById.mockResolvedValue({
        setPosts: (arr) => arr,
      });
      CategoriesRepositories.removeById.mockResolvedValue();

      const result = await CategoriesServices.removeById(category1.id);
      expect(result).toBe(`Category id ${category1.id} has been deleted`);
    });

    test('false removeById', async () => {
      CategoriesRepositories.getOneById.mockResolvedValue(null);

      await expect(CategoriesServices.removeById(category1.id)).rejects.toThrowError(
        `Category with id ${category1.id} not found`,
      );
    });
  });
});
