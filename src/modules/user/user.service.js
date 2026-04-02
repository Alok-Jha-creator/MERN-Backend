const UserModel = require("./user.model")

class UserService{
   async storeUser(data){
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
        role:user.role,
        phone:user.phone,
        gender:user.gender,
        dob:user.dob,
        address:user.address,
        image:user.image,
        status:user.status    
    }
        
    
   }
}

module.exports = new UserService()