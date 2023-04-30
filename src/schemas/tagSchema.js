const Joi = require('joi');

const tag = Joi.object({
  name: Joi.string().min(1).max(20).required(),
});

module.exports = {
  tag,
};
