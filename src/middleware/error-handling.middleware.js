const app = require("../config/express.config")

const ErrorHandler=(error,req,res,next)=>{
    console.log(error)
    let code = error.code || 500
    let detail = error.detail || error.details || null
    let message = error.message || "Internal Server Error"
    let status = error.status || "APP_ERROR" 


    res.status(code).json({
        error: detail,
        message: message,
        status:status
    });
}
module.exports = ErrorHandler;