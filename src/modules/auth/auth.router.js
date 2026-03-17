//const express = require('express');
//const router = express.Router();
const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');

authRouter.post("/register",authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUserByToken)
authRouter.post("/login",authCtrl.loginUser)
 

module.exports=authRouter;