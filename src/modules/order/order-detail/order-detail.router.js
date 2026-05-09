const Joi = require('joi');
const { userRoles } = require('../../../config/constants');
const { loginCheck } = require('../../../middleware/auth.middleware');
const { validateBodyData } = require('../../../middleware/validator.middleware');
const orderDetailCtrl = require('./order-detail.controller');



const orderDetailRouter = require('express').Router();

const AddToCart = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().min(1).max(10).required(),
})
// add to card ma ==> productId,quantity
orderDetailRouter.post('/',loginCheck([userRoles.ADMIN,userRoles.CUSTOMER,userRoles.SELLER]),validateBodyData(AddToCart),orderDetailCtrl.addToCart);
orderDetailRouter.get('/',loginCheck([userRoles.ADMIN,userRoles.CUSTOMER,,userRoles.SELLER]),orderDetailCtrl.getCartItems);


module.exports = orderDetailRouter;