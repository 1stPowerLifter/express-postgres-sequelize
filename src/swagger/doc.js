module.exports = {
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: 'API documentation for Node.js/Express application',
  },
  host: ['cool-app.fly.dev'],
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints for user authentication',
    },
    {
      name: 'Users',
      description: 'Endpoints for managing users',
    },
    {
      name: 'Roles',
      description: 'Endpoints for managing user roles',
    },
    {
      name: 'Posts',
      description: 'Endpoints for managing blog posts',
    },
    {
      name: 'Categories',
      description: 'Endpoints for managing blog post categories',
    },
    {
      name: 'Tags',
      description: 'Endpoints for managing blog post tags',
    },
  ],
  definitions: {
    Login: {
      email: 'johndoe@example.com',
      password: 'password123',
    },
    Register: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+380987654321',
      password: 'password123',
      role: 'USER',
    },
    Tockens: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    RefreshTocken: {
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    User: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+380987654321',
      password: '$2a$04$Jtz.O1xEndPwvfXYk9V4JOvSYL3xYlVoex6nxI7ZBHNM2BchuwYga',
      roleId: 1,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      origin: 'homepage',
      createdAt: '2023-03-13 17:45:03.280 +0200',
      updatedAt: '2023-03-13 17:45:03.280 +0200',
    },
    ArrOfUsers: [{ $ref: '#/definitions/User' }],
    UpdateUser: {
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
    },
    PhoneNumber: {
      phoneNumber: '+380987654321',
    },
    VerifyOTP: {
      phoneNumber: '+380987654321',
      OTP: '123456',
    },
    Passwords: {
      newPassword: 'password123new',
      repeatNewPassword: 'password123new',
      oldPassword: 'password123',
    },
    Category: {
      id: 1,
      name: 'Category',
      description: 'Example of category',
      createdAt: '2023-03-13 17:45:03.280 +0200',
      updatedAt: '2023-03-13 17:45:03.280 +0200',
    },
    ArrOfCategories: [{ $ref: '#/definitions/Category' }],
    AddCategory: {
      name: 'Category',
      description: 'Example of category',
    },
    Post: {
      id: 1,
      title: 'Title',
      content: 'Content',
      userId: 1,
      categoryId: 1,
      createdAt: '2023-03-13 17:45:03.280 +0200',
      updatedAt: '2023-03-13 17:45:03.280 +0200',
    },
    ArrOfPosts: [{ $ref: '#/definitions/Post' }],
    AddPost: {
      title: 'Title',
      content: 'Content',
      category: 'Category',
      tags: ['tag1', 'tag2'],
    },
    Role: {
      id: 1,
      role: 'User',
      createdAt: '2023-03-13 17:45:03.280 +0200',
      updatedAt: '2023-03-13 17:45:03.280 +0200',
    },
    ArrOfRoles: [{ $ref: '#/definitions/Role' }],
    AddRole: {
      role: 'User',
    },
    Tag: {
      id: 1,
      name: 'Tag',
    },
    ArrOfTags: [{ $ref: '#/definitions/Tag' }],
    AddTag: {
      name: 'Tag',
    },
  },
};
