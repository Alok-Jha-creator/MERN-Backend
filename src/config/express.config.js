const express =require("express")
const router = require("./router.config")
const app =express()


app.use(express.json({
    limit:"5mb"
}))
app.use(express.urlencoded({
    limit:"5mb",
    extended:true
})) 
app.use('/api/v1',router)
//app.use('/api/v2',router)

//404 not found
app.use((req,res,next)=>{
    res.status(404).json({
        data:{},
        message:"Not Found",
        status:"FAILED"
    })
})
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({
        data:{},
        message:"Something went wrong",
        status:"FAILED"
    })
})

module.exports=app;