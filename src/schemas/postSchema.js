const Joi = require('joi');

const post = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  content: Joi.string().min(1).max(200).required(),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

const postUpdate = Joi.object({
  title: Joi.string().min(1).max(20),
  content: Joi.string().min(1).max(200),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

module.exports = {
  post,
  postUpdate,
};
