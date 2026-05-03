const Status = require('../../config/constants').Status;
const authService = require('./auth.service');
const userService = require('../user/user.service');
const authMail = require('./auth.mail');
const { randomStringGenerator, createDate } = require('../../utilities/helpers');
const e = require('express');
const jwt = require('jsonwebtoken');
const { AppConfig } = require('../../config/config');
const bcrypt = require('bcryptjs');

class AuthController {
    registerUser = async (req, res, next) => {
        try {
            const data = await authService.transformUserForResistration(req);
            const user = await userService.storeUser(data);
            console.log("USER>>>", user);
            await authMail.notifyToActivateUserAccount(user);
            res.json({
                data: userService.getUserPublicProfile(user),
                message: "user registered successfully",
                status: "OK"
            })
        } catch (exception) {
            next(exception)
        }
    };

    activateUserByToken = async (req, res, next) => {
        try {
            const token = req.params.token;
            let userdetail = await authService.getSingleRowByFilter({
                activationToken: token
            })

            // ✅ if user not found
            if (!userdetail) throw { code: 404, message: "User has been already activated or token not found", status: "USER_ACTIVATION_ERR" }

            // ✅ check expiry - try block BHITRA
            const today = Date.now();
            const expiryTime = userdetail.expireTime.getTime(); // ✅ expiryTime → expireTime
            if (today > expiryTime) throw { code: 400, message: "Token has been expired", status: "USER_ACTIVATION_ERR" }

            // ✅ activate user account
            const update = {
                activationToken: null,
                expireTime: null,
                status: Status.ACTIVE
            }

            userdetail = await userService.updateSingleRowByfilter({ _id: userdetail._id }, update);
            await authMail.notifyWelcomeMessage(userdetail);

            res.json({
                data: userService.getUserPublicProfile(userdetail),
                message: "user account has been activated successfully",
                status: "OK"
            })
        } catch (exception) {
            next(exception) // ✅ एउटै catch block मा सबै
        }
    };

    resendActivationToken = async (req, res, next) => { // ✅ arrow function
        try {
            const token = req.params.token;
            let userdetail = await authService.getSingleRowByFilter({
                activationToken: token
            })

            // ✅ if user not found
            if (!userdetail) throw { code: 404, message: "User has been already activated or token not found", status: "USER_ACTIVATION_ERR" }

            // ✅ check expiry - try block BHITRA
            const today = Date.now();
            const expiryTime = userdetail.expireTime.getTime(); // ✅ expiryTime → expireTime
            if (today <= expiryTime) throw { code: 400, message: "Token not expired", status: "ACTIVATION_TOKEN_NOT_EXPIRED" }

            // ✅ generate new token
            const update = {
                activationToken: randomStringGenerator(),
                expireTime: createDate(new Date(), 1),
                status: Status.INACTIVE,
            };

            userdetail = await userService.updateSingleRowByfilter({ _id: userdetail._id }, update);
            await authMail.notifyToActivateUserAccount(userdetail);

            res.json({
                data: null,
                message: "A new activation token has been sent to your email address, please check your email",
                status: "OK"
            });
        } catch (exception) {
            next(exception) 
        }
    };

    loginUser = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const userDetail= await userService.getSingleRowByFilter({
                email: username
            })
            // if user is not found
            if(!userDetail) throw { 
                code: 404,
                message: "User not resistered yet", 
                status: "USER_NOT_REGISTERED" 
            }
            // if user found
           if(!bcrypt.compareSync(password,userDetail.password)){
                throw {
                    code: 401,
                    message: "Invalid credentials",
                    status: "INVALID_CREDENTIALS"
                }
           }
           // password verify
           if(userDetail.status!==Status.ACTIVE){
            throw {
                code: 403,
                message: "User account is not active yet, please check email activate your account first",
                status: "USER_ACCOUNT_NOT_ACTIVE"
            }
           }
           // generate token --> jwt(jeson web token)
                // 3 part- header, payload, signature
           const accessToken = jwt.sign({sub:userDetail._id,typ:"Bearer"},AppConfig.jwtSecret,{expiresIn:"1d"} )
           // RefresToken
           res.json({
                data: 
                accessToken,
                message: "Login successful",
                status: "LOGIN_SUCCESS"
           })

        } catch (exception) {
            next(exception)
        }
    }

    getLoggedInUserProfile = (req, res, next) => {
        res.json({ data: {}, message: "Your profile", status: "OK" })
    }

    forgotPasswordRequest = (req, res, next) => {
        res.json({ data: {}, message: "password reset successfully", status: "OK" })
    }

    updateSingleRowByfilter = (req, res, next) => {
        res.json({ data: {}, message: "User updated successfully", status: "OK" });
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;