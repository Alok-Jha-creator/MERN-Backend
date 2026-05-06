const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const uploader = require('../../middleware/uploader.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const authCtrl = require('../auth/auth.controller');
const { RegisterDTO } = require('../auth/auth.validator');
const userController = require('./user.controller');
const UserController = require('./user.controller');

const userRouter = require('express').Router();


//user routers 
userRouter.post('/',loginCheck([userRoles.ADMIN]),uploader().single('image'),validateBodyData(RegisterDTO),authCtrl.registerUser);
userRouter.get('/',loginCheck(),UserController.getAllUsers);
userRouter.delete('/:id', loginCheck([userRoles.ADMIN]), userController.deleteUserById);


module.exports = userRouter;