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
        let errorBag = {}; 
        if(exception.details && exception.details.length > 0){
          exception.details.map((err)=>{
           let field = err.path.pop();
           errorBag[field] = err.message
          })
        }
        next({
          details:errorBag,
          message:"Validation error",
          status:"VALIDATION_ERR",
          code:422
        })
      }
    }
}

module.exports = { validateBodyData }