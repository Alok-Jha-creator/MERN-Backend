const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const uploader = require('../../middleware/uploader.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const { BrandDataDTO } = require('./brand.validator');
const brandCtrl = require('./brand.controller');

const brandRouter = require('express').Router();
//CRUD
 brandRouter.post('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),uploader().single('logo'),validateBodyData(BrandDataDTO),brandCtrl.addBrand);
 brandRouter.get('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),brandCtrl.getAllBrands);
// brandRouter.get('/:id')
// brandRouter.put('/:id')
// brandRouter.delete('/:id')

module.exports = brandRouter;