const express = require('express');
const { PostsControllers } = require('../controllers');
const { validation } = require('../middlewares');
const { postSchemas } = require('../schemas');

const router = express.Router();

router.get('/', PostsControllers.getAll);
router.get('/my', PostsControllers.getUserAll);
router.post('/', validation(postSchemas.post), PostsControllers.add);
router.get('/category/:category', PostsControllers.getAllByCategory);
router.get('/my/:category', PostsControllers.getAllByUserCategory);
router.get('/:id', PostsControllers.getById);
router.patch('/:id', validation(postSchemas.postUpdate), PostsControllers.updateById);
router.delete('/:id', PostsControllers.removeById);

module.exports = router;
