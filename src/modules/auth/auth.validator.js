const Joi = require("joi");

const RegisterDTO = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    phone:Joi.string().pattern(/^[0-9]{10}$/).required(),
    password,
    role,
    gender,
    dob,
    address,
    image
});