const { UsersRepositories } = require('../repositories');
const { AuthTokenHelper } = require('../utils');

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    const id = AuthTokenHelper.verifyAt(token);
    const user = await UsersRepositories.getOneById(id);
    if (!user) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = auth;
