const { UsersServices } = require('../services');

class UsersControllers {
  async add(req, res, next) {
    try {
      /*
    #swagger.tags = ['Users']
    #swagger.description = 'Add user and returns the created user object'
    #swagger.parameters['obj'] =
      {
        name: 'Credentials',
        in: 'body',
        description: 'User credentials',
        required: true,
        schema: {
          $ref:'#/definitions/Register',
        },
      }
    #swagger.responses[201] = {
        description: 'Successful register',
        schema: {$ref:'#/definitions/User'}
      }
    #swagger.responses[404] = {
        description: 'This role not found'
      }
    #swagger.responses[409] = {
        description: 'User with this email already exists'
      }
*/
      const result = await UsersServices.add(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Users']
    #swagger.description = 'Get all users'
    #swagger.responses[200] = {
        description: 'Array whith all users',
        schema: {$ref: #/definitions/ArrOfUsers}
      }
*/
      const result = await UsersServices.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Users']
    #swagger.description = 'Get user by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'User ID.' 
      }
    #swagger.responses[200] = {
        description: 'User',
        schema: {$ref: #/definitions/User}
      }
    #swagger.responses[404] = {
        description: 'User with this id not found',
      }
*/
      const result = await UsersServices.getById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Users']
    #swagger.description = 'update user by id'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'User ID.' 
      }
    #swagger.parameters['obj'] =
      {
        name: 'User',
        in: 'body',
        description: 'User',
        required: true,
        schema: {$ref:'#/definitions/UpdateUser'}
      },
    #swagger.responses[200] = {
        description: 'User with this id update',
      }
    #swagger.responses[404] = {
        description: `User with this id not found or this role not found`,
      }
*/
      const result = await UsersServices.updateById(req.body, id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async setPassword(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Users']
    #swagger.description = 'update user pasword'
    #swagger.parameters['obj'] =
      {
        name: 'User',
        in: 'body',
        description: 'User',
        required: true,
        schema: {$ref:'#/definitions/Paswords'}
      },
    #swagger.responses[200] = {
        description: 'User with this id update',
      }
    #swagger.responses[404] = {
        description: `The passwords are not the same or the old password is incorrect or the new password does not differ from the old password`,
      }
    #swagger.responses[400] = {
        description: `User with this id not found`,
      }
*/
      const result = await UsersServices.setPassword(req.body, req.user);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeById(req, res, next) {
    const id = +req.params.id;
    try {
      /*  
    #swagger.tags = ['Users']
    #swagger.description = 'Remove user by id'
        #swagger.parameters['id'] = {
        in: 'path',
        type: 'integer',
        description: 'User ID.' 
      }
    #swagger.responses[200] = {
        description: 'User with this id has been deleted',
      }
    #swagger.responses[404] = {
        description: `User with this id not found`,
      }
*/
      const result = await UsersServices.removeById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersControllers();
