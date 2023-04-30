const { CategoriesServices } = require('../services');

class CategoriesControllers {
  async getAll(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Categories']
    #swagger.description = 'Get all categories'
    #swagger.responses[200] = {
        description: 'Array whith all categories',
        schema: {$ref: #/definitions/ArrOfCategories}
      }
*/
      const result = await CategoriesServices.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOneById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Categories']
    #swagger.description = 'Get category by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Category ID.' 
      }
    #swagger.responses[200] = {
        description: 'Category',
        schema: {$ref: #/definitions/Categoy}
      }
    #swagger.responses[404] = {
        description: 'Category with this id not found',
      }
*/
      const result = await CategoriesServices.getOneById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Categories']
    #swagger.description = 'Add category'
    #swagger.parameters['obj'] = {
        name: 'Category',
        in: 'body',
        description: 'Category',
        required: true,
        schema: {$ref:'#/definitions/AddCategory'}
      },
    #swagger.responses[200] = {
        description: 'Category',
        schema: {$ref: #/definitions/Categoy}
      }
    #swagger.responses[404] = {
        description: `Category with this name already exists`,
      }
*/
      const result = await CategoriesServices.add(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Categories']
    #swagger.description = 'update category by id'
        #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Category ID.' 
      }
    #swagger.parameters['obj'] =
      {
        name: 'Category',
        in: 'body',
        description: 'Category',
        required: true,
        schema: {$ref:'#/definitions/AddCategory'}
      },
    #swagger.responses[200] = {
        description: 'Category with this id update',
      }
    #swagger.responses[404] = {
        description: `Category with this name already exists or category with this id not found`,
      }
*/
      const result = await CategoriesServices.updateById(req.body, id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Categories']
    #swagger.description = 'Remove category by id'
        #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Category ID.' 
      }
    #swagger.responses[200] = {
        description: 'Category with this id has been deleted',
      }
    #swagger.responses[404] = {
        description: `Category with this id not found`,
      }
*/
      const result = await CategoriesServices.removeById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesControllers();
