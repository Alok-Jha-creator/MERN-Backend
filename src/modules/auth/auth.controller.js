class AuthController {
    registerUser = (req,res,next)=>{
        const data = req.body;
        const file = req.file; // multer le file lai req.file ma pathaunxa but single file upload gareko le file ma pathaunxa
        // const files = req.files; // multer le file lai req.files ma pathaunxa but multiple file upload gareko le files ma pathaunxa array 
        res.json({
            data:{ data },  
            file:{ file },  
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