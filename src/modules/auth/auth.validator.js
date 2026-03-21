const Joi = require("joi");
const {userRoles, Gender} = require("../../config/constants");

const RegisterDTO = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    phone:Joi.string().max(21).allow(null,'').optional().default(null),
    password:Joi.string().min(6).max(30).required(),
    confirmPassword:Joi.string().min(6).max(30).required(),
    role:Joi.string().allow(userRoles.SELLER,userRoles.CUSTOMER).default('customer').required(),
    gender:Joi.string().allow(Gender.MALE,Gender.FEMALE,Gender.OTHER),
    dob:Joi.date().less('now'),
    address:Joi.string().max(500).allow(null,'').optional().default(null), 
    image:Joi.string().allow(null,'').optional().default(null)
});

module.exports={RegisterDTO}