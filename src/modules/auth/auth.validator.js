const Joi = require("joi");
const {userRoles, Gender} = require("../../config/constants");

const roleExp = /^(customer|seller)$/
const GenderExp = /^(male|female|other)$/
const PasswordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/

const RegisterDTO = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    phone:Joi.string().max(21).allow(null,'').optional().default(null),
    password:Joi.string().regex(PasswordExp).required().messages({
        "string.empty":"Password is required",
        "string.pattern.base":"Password must be 8-25 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    }),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required().messages({'any.only':'Confirm password must match password'}),
    role:Joi.string().regex(roleExp).default('customer').required().default(userRoles.CUSTOMER),
    gender:Joi.string().regex(GenderExp),
    dob:Joi.date().less('now'),
    address:Joi.string().max(500).allow(null,'').optional().default(null), 
    image:Joi.string().allow(null,'').optional().default(null)
});

module.exports={RegisterDTO}