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
}