const TagsRepositories = require('../repositories/tagsRepositories');
const TagsServices = require('../services/tagsServices');
const commonTestingUtils = require('./commonTestingUtils');

const tag1 = commonTestingUtils.randomTagDb('tag1');
const tag2 = commonTestingUtils.randomTagDb('tag2');

jest.mock(`../repositories/tagsRepositories`);

describe('TagsServices testing', () => {
  describe('TagsServices.add', () => {
    test('true add', async () => {
      TagsRepositories.getOneByName.mockResolvedValue(null);
      TagsRepositories.add.mockResolvedValue(tag1);

      const result = await TagsServices.add(tag1);
      expect(result).toEqual(tag1);
    });

    test('fals add', async () => {
      TagsRepositories.getOneByName.mockResolvedValue(tag1);

      await expect(TagsServices.add(tag1)).rejects.toThrowError(`Tag with the name ${tag1.name} already exists`);
    });
  });

  describe('TagsServices.getAll', () => {
    test('getAll', async () => {
      TagsRepositories.getAll.mockResolvedValue([tag1, tag2]);

      const result = await TagsServices.getAll();
      expect(result).toEqual([tag1, tag2]);
    });
  });

  describe('TagsServices.getById', () => {
    test('true getById', async () => {
      TagsRepositories.getOneById.mockResolvedValue(tag1);

      const result = await TagsServices.getById(tag1.id);
      expect(result).toEqual(tag1);
    });

    test('false getById', async () => {
      TagsRepositories.getOneById.mockResolvedValue(null);

      await expect(TagsServices.getById(0)).rejects.toThrowError(`Tag with id 0 not found`);
    });
  });

  describe('TagsServices.removeById', () => {
    test('true removeById', async () => {
      TagsRepositories.getOneById.mockResolvedValue(tag1);
      TagsRepositories.removeById.mockResolvedValue(1);

      const result = await TagsServices.removeById(tag1.id);
      expect(result).toBe(`Tag with id ${tag1.id} has been deleted`);
    });

    test('false removeById', async () => {
      TagsRepositories.getOneById.mockResolvedValue(null);

      await expect(TagsServices.removeById(0)).rejects.toThrowError(`Tag with id 0 not found`);
    });
  });
});
