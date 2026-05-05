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

    async getSingleRowByFilter(filter){
        try {
            const userdetail = await UserModel.findOne(filter)
            return userdetail
        } catch (exception) {
             throw exception
            
        }
    }
    async updateSingleRowByfilter(filter,data){
        try {
           const userDetail= await UserModel.findOneAndUpdate(filter,{$set:data },{new:true})
              return userDetail
        } catch (exception) {
                throw exception
                
            }
    }
    async getAllRowsByFilter(filter,query){
        try {
            const page = +query.page || 1;
            const limit = +query.limit || 20;
            const skip = (page - 1) * limit;

            const data =await UserModel.find(filter)
                .sort({createdAt:'desc'})
                .skip(skip)
                .limit(limit)
            const total = await UserModel.countDocuments(filter);
            return{
                data:data.map(user=>this.getUserPublicProfile(user)),
                pagination:{
                    total: total,
                    page: page,
                    limit: limit    
                }
            }
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

module.exports = new UserService();