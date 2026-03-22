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