var Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]*$/).required(),
    body: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]*$/).required()
  }
};