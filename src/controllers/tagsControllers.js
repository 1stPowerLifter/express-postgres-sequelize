const { TagsServices } = require('../services');

class TagsControllers {
  async getAll(req, res, next) {
    try {
      /*
    #swagger.tags = ['Tags']
    #swagger.description = 'Get all tags'
    #swagger.responses[200] = {
        description: 'Array whith all tags',
        schema: {$ref: #/definitions/ArrOfTags}
      }
*/
      const result = await TagsServices.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      /*
    #swagger.tags = ['Tags']
    #swagger.description = 'Add tag'
    #swagger.parameters['obj'] = {
        name: 'Tag',
        in: 'body',
        description: 'Tag',
        required: true,
        schema: {$ref:'#/definitions/AddTag'}
      },
    #swagger.responses[200] = {
        description: 'Category',
        schema: {$ref: #/definitions/Tag}
      }
    #swagger.responses[404] = {
        description: `Tag with this name already exists`,
      }
*/
      const result = await TagsServices.add(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const id = +req.params.id;
    try {
      /*
    #swagger.tags = ['Tags']
    #swagger.description = 'Get tag by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Tag ID.' 
      }
    #swagger.responses[200] = {
        description: 'Tag',
        schema: {$ref: #/definitions/Tag}
      }
    #swagger.responses[404] = {
        description: 'Tag with this id not found',
      }
*/
      const result = await TagsServices.getById(id);
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
    #swagger.tags = ['Tags']
    #swagger.description = 'Remove tag by id'
        #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Tag ID.' 
      }
    #swagger.responses[200] = {
        description: 'Tag with this id has been deleted',
      }
    #swagger.responses[404] = {
        description: `Tag with this id not found`,
      }
*/
      const result = await TagsServices.removeById(id, userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagsControllers();
