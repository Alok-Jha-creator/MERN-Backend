const orderRouter = require('express').Router();
const Joi = require('joi');
const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const orderDetailRouter = require('./order-detail/order-detail.router');
const orderController = require('./order.controller');




const CheckOutDTO = Joi.object({
    cartId: Joi.array().items(Joi.string()).required()
})
  // cart and order detail
orderRouter.use('/detail',orderDetailRouter);
 // Order and chekout
orderRouter.post('/',loginCheck([userRoles.ADMIN,userRoles.CUSTOMER,userRoles.SELLER]),validateBodyData(CheckOutDTO),orderController.checkout)
orderRouter.get('/',loginCheck(),orderController.getMyOrders);
orderRouter.delete('/:id',loginCheck([userRoles.ADMIN,userRoles.CUSTOMER,userRoles.SELLER]),orderController.deleteOrder);

module.exports = orderRouter;