const express =require("express")
const router = require("./router.config")
const app =express()


app.use(express.json()) // for parsing application/json

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

module.exports=app;