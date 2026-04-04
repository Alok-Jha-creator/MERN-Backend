
const authService = require('./auth.service');
const userService = require('../user/user.service');
const authMail = require('./auth.mail');

class AuthController {
    registerUser = async (req,res,next)=>{
       try {  
        const data= await authService.transformUserForResistration(req);
        const user=await userService.storeUser(data);
           console.log("USER>>>", user);
        await authMail.notifyToActivateUserAccount(user);
        res.json({
            data: userService.getUserPublicProfile(user),    
            message:"user registered successfully",
            status:"OK"
        })
       } catch (exception) {
        next(exception)
       }
    } ;

    activateUserByToken = async (req,res,next)=>{
       try {
        const token = req.params.token;
        const userdetail = await authService.getSingleRowByFilter({
            activationToken: token
        })
        //if user not found
        if(!userdetail) throw {code:404, message:"User has been already activated or token not found", status:"USER_ACTIVATION_ERR"}
       } catch (exception) {
        next(exception)
       }
       //if user found
       const today = Date.now();
       const expiryTime = userdetail.expiryTime.getTime();
       if(today > expiryTime) throw {code:400, message:"Token has been expired", status:"USER_ACTIVATION_ERR"}
       
       
    }

    async resendActivationToken(req,res,next){
        //TODO: resend activation token
    }
    loginUser = (req,res,next)=>{
        res.json({
            data:{},
            message:"login successfully",
            status:"OK"
        })
    }
    getLoggedInUserProfile = (req,res,next)=>{
        res.json({
            data:{},
            message:"Your profile",
            status:"OK"
        })
    }
    forgotPasswordRequest = (req,res,next)=>{
        res.json({
            data:{},
            message:"password reset ",
            status:"OK"
        })
    }
    updateSingleRowByfilter = (req, res, next) => {
        res.json({ data: {},
        message: "User updated successfully",
        status: "OK" 
    });  
     }
}

const authCtrl = new AuthController();
module.exports=authCtrl;