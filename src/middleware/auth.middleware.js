const jwt = require("jsonwebtoken");
const { AppConfig } = require("../config/config");
const userService = require("../modules/user/user.service");
const { Status, userRoles} = require("../config/constants");
// middleware
const loginCheck = ( allowedRole= null) => {
  return async (req, res, next) => {
  try {
    let token = req.headers["authorization"]?? null ;
    if (!token) throw { code: 401, message: "login Required", status: "TOKEN_NOT_FOUND" }
    token = token.replace("Bearer ", "");
    const data = jwt.verify(token, AppConfig.jwtSecret);
    // if(data.type !== "Bearer"){
    //     throw {code:401,message:"Invalid Token Type",status:"INVALID_TOKEN_TYPE"}
    // }

    const userDetail = await userService.getSingleRowByFilter({_id:data.sub,status:Status.ACTIVE});
    if(!userDetail) throw { code: 404, message: "User not resistered or not activated", status: "USER_NOT_REGISTERED_OR_ACTIVATED" }

    //req manupulate
    req.loggedInUser = userService.getUserPublicProfile(userDetail);

    if(
      userDetail.role === userRoles.ADMIN ||
      !allowedRole ||
      allowedRole.length === 0 ||
      allowedRole.includes(userDetail.role)
  ){
      next();
    } else{
      throw {code:403,message:"You don't have permission to access",status:"ACCESS_DENIED"}
    }

  } catch (exception) {
   if(exception.name === "JsonWebTokenError" || exception.name === "TokenExpiredError"){
    return next({code:401,message:"Invalid or Expired Token",status:"INVALID_TOKEN"})
   }
   else if(exception instanceof jwt.JsonWebTokenError){
    exception.code = 401;
    exception.message = "Invalid Token";
    exception.status = "INVALID_TOKEN";
   }
   next(exception);
    
  }
}
};
module.exports = { loginCheck } ;