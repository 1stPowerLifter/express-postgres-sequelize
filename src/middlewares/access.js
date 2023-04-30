class Access {
  byRole(role) {
    return async (req, res, next) => {
      try {
        if (req.user.Role.dataValues.role !== role) {
          const error = new Error(`Only ${role} can use this rout`);
          error.status = 403;
          throw error;
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  byIdOrRole(role) {
    return async (req, res, next) => {
      try {
        if (req.user.id !== +req.params.id) {
          if (req.user.Role.dataValues.role !== role) {
            const error = new Error(`Only ${role} or user id ${req.params.id} can use this rout`);
            error.status = 403;
            throw error;
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  byOrigin(origin) {
    return async (req, res, next) => {
      try {
        if (req.user.origin !== origin) {
          const error = new Error(`Only users who have registered from the ${origin} can use this route`);
          error.status = 403;
          throw error;
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  async byId(req, res, next) {
    try {
      if (req.user.id !== +req.params.id) {
        const error = new Error(`Only user id ${req.params.id} can use this rout`);
        error.status = 403;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Access();
