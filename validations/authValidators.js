const joi = require('joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })

const registerSchema = joi.object({
    username: joi.string().required(),
    organisation: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(10).required(),
    otp: joi.string()
});

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(3).max(10).required()
});

const forgotSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(10).required(),
});

const OtpSchema = joi.object({
    userOtp: joi.number().min(6).required(),
    password: joi.string().min(3).max(10).required(),
});


exports.validateRegister = validator(registerSchema)
exports.validateLogin = validator(loginSchema)
exports.validateForgot = validator(forgotSchema)
exports.validateOtp = validator(OtpSchema)