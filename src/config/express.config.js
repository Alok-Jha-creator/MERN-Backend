const express =require("express")
const router = require("./router.config")
const app =express()


app.use(express.json()) // for parsing application/json

app.use('/api/v1',router)
//app.use('/api/v2',router)

module.exports=app;