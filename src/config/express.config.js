const express =require("express")
const router = require("./router.config")
const app =express()



/* yaha yo middle were le golobally use hunxa. next yadi na lekhe vane aagadi ko code execute hunna. next le aagadi ko code execute garna dinxa. */
/* app.use((res,req,next)=>{
    console.log("Middleware 2")
    req.user = {
        _id: 123,
        name: "Alok",
    }
    next()
})
*/

app.use(express.json()) // for parsing application/json

app.use('/api/v1',router)
//app.use('/api/v2',router)

module.exports=app;