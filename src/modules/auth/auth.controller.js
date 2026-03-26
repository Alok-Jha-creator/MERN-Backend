const cloudinarySvc = require('../../../services/cloudinary.services');
const bcrypt = require('bcryptjs');
const { randomStringGenerator } = require('../../utilities/helpers');


class AuthController {
    registerUser = async (req,res,next)=>{
       try {
        const data = req.body;
        const file = req.file; 
        data.image= await cloudinarySvc.singlefileUpload(file.path, 'users/', "200*200");

        //const salt = bcrypt.genSaltSync(12);
        //data.password=bcrypt.hashSync(data.password, "salt");
        data.password = bcrypt.hashSync(data.password, 12);
            // Activation process plan
        data.activationToken = randomStringGenerator();

        
        res.json({
            data:{ data },    
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