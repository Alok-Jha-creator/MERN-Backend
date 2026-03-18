class AuthController {
    registerUser = (req,res,next)=>{
        res.json({
            data:{},
            message:"user registered successfully",
            status:"OK"
        })
    }
    
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
            message:"user login successfully",
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
            message:"password reset link sent to email",
            status:"OK"
        })
    }
}
    
    const authCtrl = new AuthController();
    

    module.exports=authCtrl;