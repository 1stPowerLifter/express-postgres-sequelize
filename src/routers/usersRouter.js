const express = require('express');
const { UsersControllers } = require('../controllers');
const { validation, access } = require('../middlewares');
const { userSchemas } = require('../schemas');

const router = express.Router();

router.get('/', access.byRole('ADMIN'), UsersControllers.getAll);
router.post('/', access.byRole('ADMIN'), validation(userSchemas.user), UsersControllers.add);
router.patch(
  '/setpassword',
  access.byOrigin('homepage'),
  validation(userSchemas.userPasswords),
  UsersControllers.setPassword,
);
router.get('/:id', UsersControllers.getById);
router.patch('/:id', access.byIdOrRole('ADMIN'), validation(userSchemas.userUpdate), UsersControllers.updateById);
router.delete('/:id', access.byIdOrRole('ADMIN'), UsersControllers.removeById);

module.exports = router;
