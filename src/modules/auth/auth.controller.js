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