const Joi = require("joi");
const { Status } = require("../../config/constants");

const BannerDataDTO =Joi.object({
    name:Joi.string().min(3).max(50).required(),
    link:Joi.string().uri().allow(null,'').optional().default(null),
    status:Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    image:Joi.string().allow(null,'').optional().default(null),
}) 

module.exports = {BannerDataDTO}