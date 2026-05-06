const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const uploader = require('../../middleware/uploader.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const { ProductDataDTO } = require('./product.validator');
const productCtrl = require('./product.controller'); 

const productRouter = require('express').Router();

productRouter.get("/for-home",productCtrl.getAllActiveProducts);
//CRUD
 productRouter.post('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),uploader().array('images'),validateBodyData(ProductDataDTO),productCtrl.addProduct);
 productRouter.get('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),productCtrl.getAllProducts);
 productRouter.get('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),productCtrl.getProductById);
 productRouter.put('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),uploader().array('images'),validateBodyData(ProductDataDTO),productCtrl.updateProductData)
 productRouter.delete('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),productCtrl.deleteProductById)

module.exports = productRouter;