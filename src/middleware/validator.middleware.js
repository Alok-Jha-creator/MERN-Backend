const validateBodyData = (schema)=>{
    return async (req, res, next)=>{
      try {
        const data = req.body;
        if(!data){
           // res.json()
           next({code:422,message:"empty payload...",status:"PAYLOAD_ERR"})
        }
        await schema.validateAsync(data,{
            abortEarly:false
        })
        next()
      } catch (exception) {
        next({
          details:{
            name:"name not allowed to empty",
            email:"email not allowed to empty",
            password:"password not allowed to empty",
            roles:"roles not allowed to empty"
          },
          message:"Validation error",
          status:"VALIDATION_ERR",
        })
      }
    }
}

module.exports = { validateBodyData }