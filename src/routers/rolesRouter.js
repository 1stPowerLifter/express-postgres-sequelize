const express = require('express');
const { RolesControllers } = require('../controllers');
const { validation } = require('../middlewares');
const { roleSchemas } = require('../schemas');

const router = express.Router();

router.get('/', RolesControllers.getAll);
router.get('/:id', RolesControllers.getOneById);
router.post('/', validation(roleSchemas.role), RolesControllers.add);
router.patch('/:id', validation(roleSchemas.role), RolesControllers.updateById);
router.delete('/:id', RolesControllers.removeById);

module.exports = router;
