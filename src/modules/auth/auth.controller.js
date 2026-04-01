
const authService = require('./auth.service');
const userService = require('../user/user.service');
const authMail = require('./auth.mail');

class AuthController {
    registerUser = async (req,res,next)=>{
       try {  
        const data= await authService.transformUserForResistration(req);
        const user=await userService.storeUser(data);

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

    activateUserByToken = (req,res,next)=>{
        res.json({
           data:{},
           message:"user Activated successfully",
           status:"OK"
       })
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