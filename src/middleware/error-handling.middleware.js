/* sir le padhako yeti

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

*/

//claude bata fix gareko
const app = require("../config/express.config")

const ErrorHandler = (error, req, res, next) => {
    console.log(error)

    let detail = error.detail || error.details || null
    let message = error.message || "Internal Server Error"
    let status = error.status || "APP_ERROR"
    let code = error.statusCode || 500  // ← error.code hatau

    // MongoDB duplicate key error handle
    if (error.code === 11000) {
        code = 409  // Conflict
        const field = Object.keys(error.keyPattern)[0]
        message = `${field} already exists`
        status = "DUPLICATE_ERROR"
    }

    // Multer error handle
    if (error.name === "MulterError") {
        code = 400
        message = error.message
        status = "MULTER_ERROR"
    }

    res.status(code).json({
        error: detail,
        message: message,
        status: status
    });
}

module.exports = ErrorHandler;