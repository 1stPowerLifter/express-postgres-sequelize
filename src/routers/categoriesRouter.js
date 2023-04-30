const express = require('express');
const { CategoriesControllers } = require('../controllers');
const { validation } = require('../middlewares');
const { categorySchemas } = require('../schemas');

const router = express.Router();

router.get('/', CategoriesControllers.getAll);
router.get('/:id', CategoriesControllers.getOneById);
router.post('/', validation(categorySchemas.category), CategoriesControllers.add);
router.patch('/:id', validation(categorySchemas.categoryUpdate), CategoriesControllers.updateById);
router.delete('/:id', CategoriesControllers.removeById);

module.exports = router;
