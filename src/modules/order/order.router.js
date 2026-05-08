const orderRouter = require('express').Router();
const orderDetailRouter = require('./order-detail/order-detail.router');


orderRouter.use('/detail',orderDetailRouter);

module.exports = orderRouter;