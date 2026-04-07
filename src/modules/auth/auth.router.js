const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
const { loginCheck } = require('../../middleware/auth.middleware.js');
const { validateBodyData } = require('../../middleware/validator.middleware.js');
const { RegisterDTO } = require('./auth.validator.js');
const uploader = require('../../middleware/uploader.middleware.js');

// name,email,phone nuber,role,password,address,image,dob,gender,
// status,activationToken,forgetPassword,expirytime,createdAt,updatedAt.createdBy,updatedBy,_Id,
/* Auth route */

authRouter.post("/register",uploader().single('image'),validateBodyData(RegisterDTO), authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUserByToken)
    //resend activation token:TODO
authRouter.get("/resend-activation-token/:token",authCtrl.resendActivationToken)
authRouter.post("/login",authCtrl.loginUser)
authRouter.get("/profile",authCtrl.getLoggedInUserProfile)
authRouter.post("/forgot-password",authCtrl.forgotPasswordRequest)

authRouter.get('/me',loginCheck(['admin']),authCtrl.getLoggedInUserProfile)
authRouter.post('/:userId/edit-user',loginCheck(),authCtrl.updateSingleRowByfilter)
/* auth route end */
module.exports=authRouter;