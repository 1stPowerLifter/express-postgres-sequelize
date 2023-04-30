const { AuthServices } = require('../services');
const { getFacebookOAuthUrl, getGoogleOAuthUrl } = require('../utils');

class AuthControllers {
  async register(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Registers a user and returns the created user object'
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
        description: 'Already registered email or unverified phone number'
      }
*/
      const result = await AuthServices.register(req.body);
      res.status(201).json(result);
      res.json('ok');
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Logs in a user and returns a tokens'
    #swagger.parameters['obj'] =
      {
        name: 'Credentials',
        in: 'body',
        description: 'User credentials',
        required: true,
        schema: {$ref:'#/definitions/Login'}
      },
    #swagger.responses[200] = {
        description: 'Successful login',
        schema: {$ref:'#/definitions/Tockens'}
      }
    #swagger.responses[401] = {
        description: 'Invalid email or password'
      }
*/
      const result = await AuthServices.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Updates user tokens'
    #swagger.parameters['obj'] =
      {
        name: 'User tocken',
        in: 'body',
        description: 'User tocken',
        required: true,
        schema: {$ref:'#/definitions/RefreshTocken'}
      },
    #swagger.responses[200] = {
          description: 'Successful refresh',
          schema: {$ref:'#/definitions/Tockens'}
        }
    #swagger.responses[401] =  {
          description: 'Not authorized'
        },
      }
*/
      const result = await AuthServices.refresh(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'User exit from the system'
    #swagger.responses[204] = {
        description: 'Successful logout',
      },
*/
      await AuthServices.logout(req.user.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async loginGoogle(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Redirect to google login'
    #swagger.responses[302] = {
        description: 'Found',
        headers: {
          Location: {
            type: 'string',
            example: '/new-path'
          },
        },
      },
*/
      res.redirect(getGoogleOAuthUrl());
    } catch (error) {
      next(error);
    }
  }

  async oAuthGoogle(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Google login'
    #swagger.responses[200] = {
        description: 'Successful login',
        schema: {$ref:'#/definitions/Tockens'}
      },
*/
      const { data } = await AuthServices.getGoogleOAuthTokens(req.query.code);
      const userData = await AuthServices.getGoogleUsers(data);
      const result = await AuthServices.getFacebookOrGoogleUserTokens(userData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async loginFacebook(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Redirect to facebook login'
    #swagger.responses[302] = {
        description: 'Found',
        headers: {
          Location: {
            type: 'string',
            example: '/new-path'
          },
        },
      }
*/
      res.redirect(getFacebookOAuthUrl());
    } catch (error) {
      next(error);
    }
  }

  async oAuthFacebook(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Facebook login'
    #swagger.responses[200] = {
        description: 'Successful login',
        schema: {$ref:'#/definitions/Tockens'}
      },
*/
      const code = req.query.code;
      const { data } = await AuthServices.getFacebookOAuthTokens(code);
      const userData = await AuthServices.getFacebookUsers(data);
      const result = await AuthServices.getFacebookOrGoogleUserTokens(userData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async verificationNumber(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Verification number'
    #swagger.parameters['obj'] = {
        name: 'User number',
        in: 'body',
        description: 'User number',
        required: true,
        schema: {$ref:'#/definitions/PhoneNumber'}
      },
    #swagger.responses[204] = {
        description: 'SMS sent',
        schema: `Verification of the user with phoneNumber +380987654321 by number is successful. Congratulations!`;
      }
*/
      await AuthServices.verificationNumber(req.body);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      /*  
    #swagger.tags = ['Authentication']
    #swagger.description = 'Verify OTP'
    #swagger.parameters['obj'] = {
        name: 'OTP and number',
        in: 'body',
        description: 'OTP and number',
        required: true,
        schema: {$ref:'#/definitions/VerifyOTP'}
      }
    #swagger.responses[200] = {
        description: 'True verification',
      }
*/
      const result = await AuthServices.verifyOTP(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthControllers();
