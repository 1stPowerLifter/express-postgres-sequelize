const { PostsServices } = require('../services');

class PostsControllers {
  async add(req, res, next) {
    req.body.userId = +req.user.id;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Add post'
    #swagger.parameters['obj'] = {
        name: 'Post',
        in: 'body',
        description: 'Post',
        required: true,
        schema: {$ref:'#/definitions/AddPost'}
      },
    #swagger.responses[200] = {
        description: 'Post',
        schema: {$ref: #/definitions/Post}
      }
    #swagger.responses[404] = {
        description: `Post with this taitle already exists or this category not found`,
      }
*/
      const result = await PostsServices.add(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Get all posts'
    #swagger.responses[200] = {
        description: 'Posts',
        schema: {$ref: #/definitions/ArrOfPosts}
      }
*/
      const result = await PostsServices.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserAll(req, res, next) {
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Get all user posts'
    #swagger.responses[200] = {
        description: 'Posts',
        schema: {$ref: #/definitions/ArrOfPosts}
      }
*/
      const result = await PostsServices.getUserAll(+req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllByCategory(req, res, next) {
    const category = req.params.category;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Get all post by category'
    #swagger.parameters['category'] = {
        in: 'path',
        type: 'string',
        description: 'Category name.' 
      }
    #swagger.responses[200] = {
        description: 'Posts',
        schema: {$ref: #/definitions/ArrOfPosts}
      }
    #swagger.responses[400] = {
        description: `This category does not exist`,
      }
*/
      const result = await PostsServices.getAllByCategory(category);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllByUserCategory(req, res, next) {
    const category = req.params.category;
    const userId = req.user.id;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Get all posts by category and user id'
    #swagger.parameters['category'] = {
        in: 'path',
        type: 'string',
        description: 'Category name.' 
      }
    #swagger.responses[200] = {
        description: 'Posts',
        schema: {$ref: #/definitions/ArrOfPosts}
      }
    #swagger.responses[400] = {
        description: `This category does not exist`,
      }
*/
      const result = await PostsServices.getAllByUserCategory(category, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const id = +req.params.id;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Get post by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Post id.' 
      }
    #swagger.responses[200] = {
        description: 'Post',
        schema: {$ref: #/definitions/Post}
      }
    #swagger.responses[404] = {
        description: `Post with this id not found`,
      }
*/
      const result = await PostsServices.getById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req, res, next) {
    req.body.id = +req.params.id;
    req.body.userId = req.user.id;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Update post by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Post id.' 
      }
    #swagger.parameters['obj'] = {
        name: 'Post',
        in: 'body',
        description: 'Post',
        required: true,
        schema: {$ref:'#/definitions/AddPost'}
      },
    #swagger.responses[200] = {
        description: 'Post with this id update',
      }
    #swagger.responses[404] = {
        description: `This category not found`,
      }
    #swagger.responses[400] = {
        description: `You don't have a post with this id`,
      }
*/
      const result = await PostsServices.updateById(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeById(req, res, next) {
    const id = +req.params.id;
    const userId = req.user.id;
    try {
      /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Remove post by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Post id.' 
      }
    #swagger.responses[200] = {
        description: 'Post with this id has been deleted',
      }
    #swagger.responses[400] = {
        description: `You don't have a post with this id`,
      }
*/
      const result = await PostsServices.removeById(id, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsControllers();
