const PostsRepositories = require('./postsRepositories');
const RolesRepositories = require('./rolesRepositories');
const UsersRepositories = require('./usersRepositories');
const CategoriesRepositories = require('./categoriesRepositories');
const TagsRepositories = require('./tagsRepositories');
const Post_TagsRepositories = require('./post_tagsRepositories');
const SmsRepositories = require('./smsRepositories');
const MailsRepositories = require('./mailsRepositories');

module.exports = {
  RolesRepositories,
  UsersRepositories,
  PostsRepositories,
  CategoriesRepositories,
  TagsRepositories,
  Post_TagsRepositories,
  SmsRepositories,
  MailsRepositories,
};
