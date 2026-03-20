// middleware
const loginCheck = ( allowedRole= null) => {
  return (req, res, next) => {
     //logic
   //check if user is logged in or not
   console.log("Middleware 1")
   //manipulate req object
   //respont to user
   //next function scope
   // throw an error through error handler
   next();
  }
   // return checkLogin;
};
module.exports = { loginCheck } ;