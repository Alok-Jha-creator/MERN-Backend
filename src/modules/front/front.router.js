const frontRouter = require('express').Router();
const frontCtrl = require('./front.controller');

frontRouter.get('/', frontCtrl.getHome);
frontRouter.get('/about-us', frontCtrl.getAboutUs);

module.exports = frontRouter;