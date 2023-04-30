const PostsServices = require('../services/postsServices');
const PostsRepositories = require('../repositories/postsRepositories');
const CategoriesRepositories = require('../repositories/categoriesRepositories');
const commonTestingUtils = require('./commonTestingUtils');
const TagsRepositories = require('../repositories/tagsRepositories');

const post1 = commonTestingUtils.randomPostDb({});
const post2 = commonTestingUtils.randomPostDb({});
const post3 = commonTestingUtils.randomPostDb({});
const newPostWhitTags = commonTestingUtils.randomPost(['new', 'old']);
const newPostWhitoutTags = commonTestingUtils.randomPost();
const category = commonTestingUtils.randomCategoryDb();
const arrPosts = [post1, post2, post3];
const user = commonTestingUtils.randomUserDb();
const userPost1 = commonTestingUtils.randomPostDb({
  userId: user.id,
  categoryId: category.id,
  tagsDb: commonTestingUtils.createTags(['1', '2']),
});
const userPost2 = commonTestingUtils.randomPostDb({
  userId: user.id,
  categoryId: category.id,
  tagsDb: commonTestingUtils.createTags(['3', '4']),
});
const userPost3 = commonTestingUtils.randomPostDb({ userId: user.id, categoryId: null });

jest.mock(`../repositories/postsRepositories`);
jest.mock(`../repositories/categoriesRepositories`);
jest.mock(`../repositories/tagsRepositories`);

describe('PostsServices testing', () => {
  describe('PostsServices.add', () => {
    test('true add whith category and tags', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(null);
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category);
      PostsRepositories.add.mockResolvedValue(
        commonTestingUtils.randomPostDb({
          post: newPostWhitTags,
          userId: user.id,
          categoryId: category.id,
        }),
      );
      TagsRepositories.getByNames.mockResolvedValue(commonTestingUtils.createTags([newPostWhitTags.tags[0]]));
      TagsRepositories.addTags.mockResolvedValue(commonTestingUtils.createTags([newPostWhitTags.tags[1]]));

      const result = await PostsServices.add({
        title: newPostWhitTags.title,
        category: category.name,
        content: newPostWhitTags.content,
        userId: user.id,
        tags: newPostWhitTags.tags,
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.title).toBe(newPostWhitTags.title);
      expect(result.content).toBe(newPostWhitTags.content);
      expect(result.categoryId).toBe(category.id);
      expect(result.tags[0]).toHaveProperty('dataValues');
      expect(result.tags[0].dataValues).toHaveProperty('createdAt');
      expect(result.tags[0].dataValues).toHaveProperty('updatedAt');
      expect(result.tags[0].dataValues).toHaveProperty('id');
      expect(result.tags[0].dataValues.name).toBe(newPostWhitTags.tags[0]);
    });

    test('true add whith category', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(null);
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category);
      PostsRepositories.add.mockResolvedValue(
        commonTestingUtils.randomPostDb({
          post: newPostWhitoutTags,
          userId: user.id,
          categoryId: category.id,
        }),
      );

      const result = await PostsServices.add({
        title: newPostWhitoutTags.title,
        category: category.name,
        content: newPostWhitoutTags.content,
        userId: user.id,
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.title).toBe(newPostWhitoutTags.title);
      expect(result.content).toBe(newPostWhitoutTags.content);
      expect(result.categoryId).toBe(category.id);
      expect(result.tags[0]).toBeUndefined();
    });

    test('true add whith tags', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(null);
      PostsRepositories.add.mockResolvedValue(
        commonTestingUtils.randomPostDb({
          post: newPostWhitTags,
          userId: user.id,
        }),
      );
      TagsRepositories.getByNames.mockResolvedValue(commonTestingUtils.createTags(newPostWhitTags.tags));
      TagsRepositories.addTags.mockResolvedValue([]);

      const result = await PostsServices.add({
        title: newPostWhitTags.title,
        content: newPostWhitTags.content,
        userId: user.id,
        tags: newPostWhitTags.tags,
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.title).toBe(newPostWhitTags.title);
      expect(result.content).toBe(newPostWhitTags.content);
      expect(result.categoryId).toBe(null);
      expect(result.tags[0].dataValues.id).toBe(1);
      expect(result.tags[0].dataValues).toHaveProperty('createdAt');
      expect(result.tags[0].dataValues).toHaveProperty('updatedAt');
      expect(result.tags[0].dataValues.name).toBe(newPostWhitTags.tags[0]);
    });

    test('true add', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(null);
      PostsRepositories.add.mockResolvedValue(
        commonTestingUtils.randomPostDb({
          post: newPostWhitTags,
          userId: user.id,
        }),
      );

      const result = await PostsServices.add({
        title: newPostWhitTags.title,
        content: newPostWhitTags.content,
        userId: user.id,
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.title).toBe(newPostWhitTags.title);
      expect(result.content).toBe(newPostWhitTags.content);
      expect(result.categoryId).toBe(null);
      expect(result.tags[0]).toBeUndefined();
    });

    test('false add, old post', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(true);

      await expect(
        PostsServices.add({
          title: newPostWhitTags.title,
          content: newPostWhitTags.content,
          userId: user.id,
        }),
      ).rejects.toThrowError(`A post with the title ${newPostWhitTags.title} already exists`);
    });

    test('false add, category not found', async () => {
      PostsRepositories.getOneByUserIdAndTitle.mockResolvedValue(null);
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);

      await expect(
        PostsServices.add({
          title: newPostWhitTags.title,
          content: newPostWhitTags.content,
          userId: user.id,
          category: category.name,
        }),
      ).rejects.toThrowError(`${category.name} category not found`);
    });
  });

  describe('PostsServices.getAll', () => {
    test('getAll', async () => {
      PostsRepositories.getAll.mockResolvedValue(arrPosts);

      const result = await PostsServices.getAll();
      expect(result).toHaveLength(arrPosts.length);
      expect(result[0].title).toBe(arrPosts[0].title);
      expect(result[0].content).toBe(arrPosts[0].content);
      expect(result[0].categoryId).toBe(arrPosts[0].categoryId);
      expect(result[0].userId).toBe(arrPosts[0].userId);
      expect(result[0].id).toBe(arrPosts[0].id);
      expect(result[0].tags[0]).toBe(arrPosts[0].tags[0]);
      expect(result[0].createdAt).toBe(arrPosts[0].createdAt);
      expect(result[0].updatedAt).toBe(arrPosts[0].updatedAt);
    });
  });

  describe('PostsServices.getUserAll', () => {
    test('getUserAll', async () => {
      PostsRepositories.getAllByUserId.mockResolvedValue([userPost1, userPost2]);

      const result = await PostsServices.getUserAll(user.id);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe(userPost1.title);
      expect(result[0].content).toBe(userPost1.content);
      expect(result[0].categoryId).toBe(userPost1.categoryId);
      expect(result[0].userId).toBe(userPost1.userId);
      expect(result[0].id).toBe(userPost1.id);
      expect(result[0].tags[0]).toBe(userPost1.tags[0]);
      expect(result[0].createdAt).toBe(userPost1.createdAt);
      expect(result[0].updatedAt).toBe(userPost1.updatedAt);
    });
  });

  describe('PostsServices.getAllByCategory', () => {
    test('true getAllByCategory by category', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category);
      PostsRepositories.getAllByCategory.mockResolvedValue([userPost1, userPost2]);

      const result = await PostsServices.getAllByCategory(category.name);
      expect(result).toHaveLength(2);
      expect(result[0].categoryId).toBe(category.id);
      expect(result[1].categoryId).toBe(category.id);
    });

    test('true getAllByCategory by null', async () => {
      PostsRepositories.getAllByCategory.mockResolvedValue([userPost3]);

      const result = await PostsServices.getAllByCategory('null');
      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe(null);
    });

    test('false getAllByCategory by not exist category', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);

      await expect(PostsServices.getAllByCategory('????')).rejects.toThrowError(`The category "????" does not exist`);
    });
  });

  describe('PostsServices.getAllByUserCategory', () => {
    test('true getAllByUserCategory by category', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category);
      PostsRepositories.getAllByUserCategory.mockResolvedValue([userPost1, userPost2]);

      const result = await PostsServices.getAllByUserCategory(category.name, user.id);
      expect(result).toHaveLength(2);
      expect(result[0].categoryId).toBe(category.id);
      expect(result[1].categoryId).toBe(category.id);
      expect(result[0].userId).toBe(user.id);
      expect(result[1].userId).toBe(user.id);
    });

    test('true getAllByUserCategory by null', async () => {
      PostsRepositories.getAllByUserCategory.mockResolvedValue([userPost3]);

      const result = await PostsServices.getAllByUserCategory('null', user.id);
      expect(result).toHaveLength(1);
      expect(result[0].categoryId).toBe(null);
      expect(result[0].userId).toBe(user.id);
    });

    test('false getAllByUserCategory by not exist category', async () => {
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);

      await expect(PostsServices.getAllByUserCategory('????')).rejects.toThrowError(
        `The category "????" does not exist`,
      );
    });
  });

  describe('PostsServices.getById', () => {
    test('true getById by category', async () => {
      PostsRepositories.getOneById.mockResolvedValue(post1);

      const result = await PostsServices.getById(post1.id);
      expect(result.id).toBe(post1.id);
    });

    test('false getById, not found', async () => {
      PostsRepositories.getOneById.mockResolvedValue(null);

      await expect(PostsServices.getById(0)).rejects.toThrowError(`Post with id 0 not found`);
    });
  });

  describe('PostsServices.updateById', () => {
    test('true updateById empty post', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(userPost1);
      PostsRepositories.updateById.mockResolvedValue();
      CategoriesRepositories.getOneByCategory.mockResolvedValue(category);
      TagsRepositories.getByNames.mockResolvedValue(commonTestingUtils.createTags(['old']));
      TagsRepositories.addTags.mockResolvedValue(commonTestingUtils.createTags(['old', 'oneMoreNew']));

      const result = await PostsServices.updateById({
        title: 'newTitle',
        category: category.name,
        content: 'newContent',
        userId: user.id,
        id: userPost1.id,
        tags: ['new', 'old', 'oneMoreNew'],
      });
      expect(result).toBe(`Post with id ${userPost1.id} update`);
      expect(userPost1.tags).toHaveLength(3);
      expect(userPost1.tags[2].dataValues.name).toBe('oneMoreNew');
    });

    test('true updateById full post', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(userPost1);

      const result = await PostsServices.updateById({ userId: user.id, id: userPost1.id });
      expect(result).toBe(`Post with id ${userPost1.id} update`);
    });

    test('false updateById, not found post', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(null);

      await expect(PostsServices.updateById({ userId: user.id, id: 0 })).rejects.toThrowError(
        `You don't have a post with id 0`,
      );
    });

    test('false updateById, not found category', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(userPost1);
      CategoriesRepositories.getOneByCategory.mockResolvedValue(null);

      await expect(
        PostsServices.updateById({ userId: user.id, id: userPost1.id, category: '????' }),
      ).rejects.toThrowError(`???? category not found`);
    });
  });

  describe('PostsServices.removeById', () => {
    test('true removeById by category', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(userPost1);
      PostsRepositories.removeById.mockResolvedValue();

      const result = await PostsServices.removeById(userPost1.id, user.id);
      expect(result).toBe(`Post with id ${userPost1.id} has been deleted`);
      expect(userPost1.tags).toHaveLength(0);
      expect(userPost1.tags[0]).toBeUndefined();
    });

    test('false removeById, not found', async () => {
      PostsRepositories.getOneByIdAndUserId.mockResolvedValue(null);

      await expect(PostsServices.removeById(0, user.id)).rejects.toThrowError(`You don't have a post with id 0`);
    });
  });
});
