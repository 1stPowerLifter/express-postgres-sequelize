const { faker } = require('@faker-js/faker');
const { DEFAULT_PASS = '1111' } = process.env;

class CommonTestingUtils {
  idCounter = 0;

  randomUser(role) {
    if (!role) role = 'USER';
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);
    return {
      firstName,
      lastName,
      email,
      password: DEFAULT_PASS,
      phoneNumber: faker.phone.number('+380#########'),
      role,
    };
  }

  randomUserDb(user) {
    if (!user) {
      user = this.randomUser();
    }
    let roleId;
    user.role === 'USER' ? (roleId = 1) : (roleId = 2);
    this.idCounter++;
    return {
      ...user,
      id: this.idCounter++,
      role: undefined,
      roleId,
      origin: 'homepage',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  randomCategory() {
    return {
      name: faker.word.noun(),
      description: faker.lorem.words(10),
    };
  }

  randomCategoryDb(category) {
    if (!category) {
      category = this.randomCategory();
    }
    this.idCounter++;
    return {
      ...category,
      id: this.idCounter++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  randomPost(tags) {
    const post = {
      title: faker.word.noun(),
      content: faker.lorem.words(20),
    };
    if (tags) post.tags = tags;
    return post;
  }

  randomPostDb({ post, userId, categoryId, tagsDb }) {
    let tags;
    if (!post) {
      post = this.randomPost();
    }
    if (!userId) {
      userId = this.idCounter;
    }
    if (!categoryId) {
      categoryId = null;
    }
    if (tagsDb) {
      tags = tagsDb.map((tag) => tag.dataValues);
    } else {
      tags = [];
    }
    this.idCounter++;
    return {
      ...post,
      tags,
      id: this.idCounter++,
      userId,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
      addTags(tags) {
        this.tags.push(...tags);
      },
      setTags(tags) {
        this.tags = tags;
      },
    };
  }

  createTags(tags = []) {
    return tags.map((tag, idx) => ({
      dataValues: {
        name: tag,
        id: idx + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }));
  }

  randomRoleDb(role) {
    if (!role) role = faker.word.noun();
    this.idCounter++;
    return {
      id: this.idCounter,
      role,
      Users: [],
      addUsers(Users) {
        this.Users.push(...Users);
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  randomTagDb(name) {
    if (!name) name = faker.word.noun();
    this.idCounter++;
    return {
      id: this.idCounter,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      setPosts: (arr) => arr,
    };
  }
}

module.exports = new CommonTestingUtils();
