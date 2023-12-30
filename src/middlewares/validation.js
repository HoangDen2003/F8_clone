const Joi = require("joi");

const userValidation = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().pattern(new RegExp("@gmail.com$")).email().required(),
  password: Joi.string()
    .min(4)
    .max(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{4,8}$")),
});

module.exports = { userValidation };
