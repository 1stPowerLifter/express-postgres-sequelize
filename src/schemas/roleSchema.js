const Joi = require('joi');

const role = Joi.object({
  role: Joi.string().min(1).max(20).required(),
});

module.exports = {
  role,
};
