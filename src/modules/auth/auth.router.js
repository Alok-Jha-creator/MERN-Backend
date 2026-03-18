const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
/* Auth route */
authRouter.post("/register",authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUserByToken)
authRouter.post("/login",authCtrl.loginUser)
authRouter.get("/profile",authCtrl.getLoggedInUserProfile)
authRouter.post("/forgot-password",authCtrl.forgotPasswordRequest)
/* auth route end */
 

module.exports=authRouter;