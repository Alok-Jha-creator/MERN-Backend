const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const uploader = require('../../middleware/uploader.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const { CategoryDataDTO } = require('./category.validator');
const categoryCtrl = require('./category.controller'); 

const categoryRouter = require('express').Router();

categoryRouter.get("/for-home",categoryCtrl.getAllActiveCategories);
//CRUD
 categoryRouter.post('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),uploader().single('image'),validateBodyData(CategoryDataDTO),categoryCtrl.addCategory);
 categoryRouter.get('/',loginCheck([userRoles.ADMIN,userRoles.SELLER]),categoryCtrl.getAllCategories);
 categoryRouter.get('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),categoryCtrl.getCategoryById);
 categoryRouter.put('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),uploader().single('image'),validateBodyData(CategoryDataDTO),categoryCtrl.updateCategoryData)
 categoryRouter.delete('/:id',loginCheck([userRoles.ADMIN,userRoles.SELLER]),categoryCtrl.deleteCategoryById)

module.exports = categoryRouter;