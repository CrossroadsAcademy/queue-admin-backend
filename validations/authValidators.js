const joi = require('joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const registerSchema = joi.object({
    username: joi.string().required(),
    organisation: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(10).required()
});

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(3).max(10).required()
});

const forgotPassword = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

exports.validateRegister = validator(registerSchema)
exports.validateLogin = validator(loginSchema)
exports.forgotPassword = validator(forgotPassword)