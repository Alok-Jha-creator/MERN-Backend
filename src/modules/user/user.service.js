const UserModel = require("./user.model")

class UserService{
   async storeUser(){
        try {
            const user =new UserModel(data)
            return await user.save()
        } catch (exception) {
            throw exception
        }
    }

   getUserPublicProfile(user){
    return {
        _id:user._id,
        name:user.name,
        email:user.email,
    }
        
    
   }
}

module.exports = new UserService()