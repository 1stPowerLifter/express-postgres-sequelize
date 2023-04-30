const express = require('express');
const { TagsControllers } = require('../controllers');
const { validation } = require('../middlewares');
const { tagSchemas } = require('../schemas');

const router = express.Router();

router.get('/', TagsControllers.getAll);
router.post('/', validation(tagSchemas.tag), TagsControllers.add);
router.get('/:id', TagsControllers.getById);
router.delete('/:id', TagsControllers.removeById);

module.exports = router;
