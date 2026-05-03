const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
const { loginCheck } = require('../../middleware/auth.middleware.js');
const { validateBodyData } = require('../../middleware/validator.middleware.js');
const { RegisterDTO,loginDTO, ForgetPasswordDTO } = require('./auth.validator.js');
const uploader = require('../../middleware/uploader.middleware.js');

// name,email,phone nuber,role,password,address,image,dob,gender,
// status,activationToken,forgetPassword,expirytime,createdAt,updatedAt.createdBy,updatedBy,_Id,


//updateuser allow only to update ,name phone,gender,dob,address,image
/* Auth route */

authRouter.post("/register",uploader().single('image'),validateBodyData(RegisterDTO), authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUserByToken)
authRouter.get("/resend-activation-token/:token",authCtrl.resendActivationToken)
authRouter.post("/login",validateBodyData(loginDTO),authCtrl.loginUser)
authRouter.get('/me',loginCheck(),authCtrl.getLoggedInUserProfile)
authRouter.post('/:userId/edit-user',loginCheck(),authCtrl.updateSingleRowByfilter)


authRouter.get("/profile",authCtrl.getLoggedInUserProfile)
// add validator for email
authRouter.post("/forgot-password",validateBodyData(ForgetPasswordDTO),authCtrl.forgotPasswordRequest)
// authRouter.post("/verify-token/:token",authCtrl.verifyForgetPassword)
// authRouter.post("/reset-password/:token",validateBody(passwordresetDTO),authCtrl.resetPassword)

/* auth route end */
module.exports=authRouter;