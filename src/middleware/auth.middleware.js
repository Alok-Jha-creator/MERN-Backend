const jwt = require("jsonwebtoken");
const { AppConfig } = require("../config/config");
// middleware
const loginCheck = ( allowedRole= null) => {
  return (req, res, next) => {
  try {
    let token = req.headers["authorization"]?? null ;
    if (!token) throw { code: 401, message: "login Required", status: "TOKEN_NOT_FOUND" }
    token = token.replace("Bearer ", "");
    const data = jwt.verify(token, AppConfig.jwtSecret);



  } catch (exception) {
   if(exception.name === "JsonWebTokenError" || exception.name === "TokenExpiredError"){
    return next({code:401,message:"Invalid or Expired Token",status:"INVALID_TOKEN"})
   }
   console.log("Exception in auth middleware", exception);
    
  }
}
};
module.exports = { loginCheck } ;