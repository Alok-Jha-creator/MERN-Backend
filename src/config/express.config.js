const express =require("express")
const router = require("./router.config")
const ErrorHandler = require("../middleware/error-handling.middleware")
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
   next({
    code:404,
    error: null,
    message: "Not found",
    status: "NOT_FOUND_ERR"
   })
})

app.use(ErrorHandler)

module.exports=app;