const { userRoles } = require("../../config/constants");
const OrderDetailModel = require("./order-detail/order-detail.model");
const orderDetailService = require("./order-detail/order-detail.service");
const OrderModel = require("./order.model");
const orderService = require("./order.service");

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
            if(!data || data.length <= 0){
                throw { code: 404, message:'No cart item found for checkout',status:'CART_NOT_FOUND'}
            }

            //order placed
            let orderObj = orderService.createOrderObj(data,loggedInUser);
            orderObj = await orderService.storeOrder(orderObj);
            // order update
             await orderDetailService.assignOrderToCart(data,orderObj);
            // TODO: notify to user stating checkout successfull
            res.json({
                data: orderObj,
                message:"Order placed successfully",
                status:"SUCCESS"
            })
        } catch (exception) {
            next(exception)
            
        }
    }

    async getMyOrders(req,res,next){   
        try {
            const loggedInUser = req.loggedInUser;
            const filter = { };
            if(loggedInUser.role === userRoles.CUSTOMER){
                filter ={
                    buyer: loggedInUser._id
                }
            }
            if(req.query.status){
                filter={
                    ...filter,
                    status: req.query.status
                }
            }
            const {data,pegination} = await orderService.getAllRows(filter,req.query);
            res.json({
                data:data,
                message:"Your Order list ",
                status:"SUCCESS",
                meta:{pegination}
            })
        } catch (exception) {
            next(exception)
            
        }
    }

    async deleteOrder(req,res,next){
        try {
            let filter = {_id:req.params.id};
            if(req.loggedInUser.role===userRoles.CUSTOMER){
                filter = {
                    ...filter,
                    buyer:req.loggedInUser._id
                }
            }
            const orderData = await orderService.getSingleRowByFilter(filter);
            if(!orderData){
                throw { code: 404, message:'Order not found',status:'ORDER_NOT_FOUND'}
            }
            const del = await orderService.orderDeleteById(orderData._id);
            res.json({
                data:del,
                message:"Order deleted successfully",
                status:"SUCCESS"
            })
        } catch (exception) {
            next(exception)
            
        }
    }
   
}
module.exports = new OrderController();