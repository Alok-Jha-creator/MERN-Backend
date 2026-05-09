const orderDetailService = require("./order-detail/order-detail.service");

class OrderController {
    async checkout (req,res,next){
        try {
            const {cartId} = req.body;
            const loggedInUser = req.loggedInUser;

            //cart verified
            const {data} = await orderDetailService.getAllRows({
                order: {$eq:null},  
                buyer: loggedInUser._id,
                _id: {$in: cartId},
                status:'pending'
            },{page:1,limit: cartId.length})
            if(!data){
                throw { code: 404, message:'No cart item found for checkout',status:'CART_NOT_FOUND'}
            }
            
        } catch (exception) {
            next(exception)
            
        }
    }
}

module.exports = new OrderController();