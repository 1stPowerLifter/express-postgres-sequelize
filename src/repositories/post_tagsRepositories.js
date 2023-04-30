const { Post_Tag } = require('../models');

class Post_TagsRepositories {
  async addLink(postId, tagId) {
    return Post_Tag.create({ postId, tagId });
  }

  async removeLink(postId, tagId) {
    return Post_Tag.destroy({ where: { postId, tagId } });
  }

  async removeByPostId(postId) {
    return Post_Tag.destroy({ where: { postId } });
  }

  async removeByTagId(tagId) {
    return Post_Tag.destroy({ where: { tagId } });
  }
}

module.exports = new Post_TagsRepositories();
