const Joi = require("joi");
const { Status } = require("../../config/constants");

const ProductDataDTO =Joi.object({
    name:Joi.string().min(3).max(150).required(),
    description:Joi.string().required(),
    price:Joi.number().min(100).required(),
    discount:Joi.number().min(0).max(90).default(0),
    status:Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    category:Joi.string().allow(null,'').optional().default(null),
    //brand:Joi.array().items(Joi.string().allow(null,'').optional().default(null)).allow(null,'').default(null),
    brand: Joi.string().allow(null,'').optional().default(null),
    seller:Joi.string().required(),
    isFeatured:Joi.boolean().optional().default(false),
    images:Joi.string().allow(null,'').optional().default(null),
}) 

module.exports = {ProductDataDTO}