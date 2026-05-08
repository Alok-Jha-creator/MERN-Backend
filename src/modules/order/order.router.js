const orderRouter = require('express').Router();
const orderDetailRouter = require('./order-detail/order-detail.router');


orederRouter.use('/detail',orderDetailRouter);

module.exports = orderRouter;