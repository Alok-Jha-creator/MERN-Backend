const cloudinarySvc = require("../../../services/cloudinary.services")
const bcrypt = require("bcryptjs")
const {randomStringGenerator,createDate}= require("../../utilities/helpers")
const {Status} = require("../../config/constants")

class AuthService{
    async transformUserForResistration(req){
        try {
            const data = req.body;

           // if(!req.file){
           //     throw {code:400,message:"Image Required",detail:{image :"Image is compulsory",status:"VALIDATION_ERR"}}
           // }    

              if(req.file){
                const file = req.file; 
                data.image= await cloudinarySvc.singlefileUpload(file.path, 'users/', "200*200");
              }
            //const salt = bcrypt.genSaltSync(12);
            //data.password=bcrypt.hashSync(data.password, "salt");
            data.password = bcrypt.hashSync(data.password, 12);
           
            // Activation process plan
            data.activationToken = randomStringGenerator();
            data.expireTime = createDate(new Date(), 1); // 1 day ko activation token valid hunxa
            data.status = Status.INACTIVE; 
            return data;
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new AuthService()