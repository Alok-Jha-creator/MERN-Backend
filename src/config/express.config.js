const express =require("express")
const router = require("./router.config")
const app =express()


app.use((res,req,next)=>{
    console.log("Middleware 1")
    next()
})

app.use((res,req,next)=>{
    console.log("Middleware 2")
    next()
})


app.use(express.json()) // for parsing application/json

app.use('/api/v1',router)
//app.use('/api/v2',router)

module.exports=app;