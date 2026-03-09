//const express = require('express');
//const router = express.Router();

const authRouter = require('express').Router();

/** Auth Routes Start**/
authRouter.post("/register",(req,res,next)=>{
    //logic
    res.json({
        data:{},
        message:"user registered successfully",
        status:"OK"
    })
})

authRouter.get('/activate/123',(req,res,next)=>{
     //logic
     res.json({
        data:{},
        message:"user Activated successfully",
        status:"OK"
    })

})

authRouter.post("/login",(req,res,next)=>{
    //logic
    res.json({
        data:{},
        message:"user logged in successfully",
        status:"OK"
    })
})
 
/** Auth Routes End */

module.exports=authRouter;