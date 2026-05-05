const userService = require("./user.service");

class UserController{
    async getAllUsers(req, res, next) {
        try {
            const loggedInUser = req.loggedInUser;
            let filter = {
                _id:{$ne: loggedInUser._id}
            }
            if(req.query.role){
                filter ={
                    ...filter,
                    role: req.query.role
                }
            }
            if(req.query.search){
                filter = {
                    ...filter,
                    $or:[
                        {name: new RegExp(req.query.search, 'i')},
                        {email: new RegExp(req.query.search, 'i')},
                        {phone: new RegExp(req.query.search, 'i')}
                    ]
                }
            }
            //pagination limit and page
            const {data,pagination} = await userService.getAllRowsByFilter(filter,req.query);
            res.json({
                data: data,
                message: "user list",
                status: "OK",
                meta:{pagination}
            })
        } catch (exception) {
             next(exception)          
        }
    }
    async deleteUser(req, res, next) {
        
    }
}


module.exports = new UserController();