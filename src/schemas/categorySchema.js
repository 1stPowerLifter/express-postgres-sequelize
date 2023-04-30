const Joi = require('joi');

const category = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string().min(1).max(200).required(),
});

const categoryUpdate = Joi.object({
  name: Joi.string().min(1).max(20),
  description: Joi.string().min(1).max(200),
});

module.exports = {
  category,
  categoryUpdate,
};
