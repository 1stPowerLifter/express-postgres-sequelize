const { RolesServices } = require('../services');

class RolesControllers {
  async getAll(req, res, next) {
    try {
      /*
    #swagger.tags = ['Roles']
    #swagger.description = 'Get all roles'
    #swagger.responses[200] = {
        description: 'Roles',
        schema: {$ref: #/definitions/ArrOfRoles}
      }
*/
      const result = await RolesServices.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOneById(req, res, next) {
    const id = +req.params.id;
    try {
      /*
    #swagger.tags = ['Roles']
    #swagger.description = 'Get role by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Role id.' 
      }
    #swagger.responses[200] = {
        description: 'Role',
        schema: {$ref: #/definitions/Role}
      }
    #swagger.responses[404] = {
        description: `Role with this id not found`,
      }
*/
      const result = await RolesServices.getOneById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      /*
    #swagger.tags = ['Roles']
    #swagger.description = 'Add role'
    #swagger.parameters['obj'] = {
        name: 'Role',
        in: 'body',
        description: 'Role',
        required: true,
        schema: {$ref:'#/definitions/AddRole'}
      },
    #swagger.responses[200] = {
        description: 'Role',
        schema: {$ref:'#/definitions/Role'}
      }
    #swagger.responses[404] = {
        description: `This role already exists`,
      }
*/
      const result = await RolesServices.add(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req, res, next) {
    const id = +req.params.id;
    try {
      /*
    #swagger.tags = ['Roles']
    #swagger.description = 'Update role by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Role id.' 
      }
    #swagger.parameters['obj'] = {
        name: 'Role',
        in: 'body',
        description: 'Role',
        required: true,
        schema: {$ref:'#/definitions/AddRole'}
      },
    #swagger.responses[200] = {
        description: 'Role with this id update'
      }
    #swagger.responses[404] = {
        description: `Role with this id not found`,
      }
*/
      const result = await RolesServices.updateById(req.body, id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeById(req, res, next) {
    const id = +req.params.id;
    try {
      /*
    #swagger.tags = ['Roles']
    #swagger.description = 'Remove role by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'Role id.' 
      }
    #swagger.responses[200] = {
        description: 'Role with this id has been deleted'
      }
    #swagger.responses[404] = {
        description: `Role with this id not found`,
      }
*/
      const result = await RolesServices.removeById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RolesControllers();
