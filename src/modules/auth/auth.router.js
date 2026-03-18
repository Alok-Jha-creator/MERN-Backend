const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');

authRouter.post("/register",authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUserByToken)
authRouter.post("/login",authCtrl.loginUser)
authRouter.get("/profile",authCtrl.getLoggedInUserProfile)
authRouter.post("/forgot-password",authCtrl.forgotPasswordRequest)

 

module.exports=authRouter;