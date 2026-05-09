const {productService} = require('../../product/product.service');
const orderDetailService = require('./order-detail.service');


class OrderDetailController {
    async addToCart(req,res,next){
        try {
            const {product,quantity} = req.body;
            const loggedInUser =req.loggedInUser;
            //product Detail
            const productDetail = await productService.getSingleRowByFilter({
                _id:product
            })
            if(!productDetail){
                throw { code: 404, message:'Product not found',status:'NOT_FOUND'}
            }
            //cart Detail
            let existingCart = await orderDetailService.getSingleRowByFilter({
                product:product,
                buyer:loggedInUser._id,
                order:{$eq:null},
                status:'pending'
            })

            let message =""


            if(existingCart){
                let updateBody ={
                quantity: +existingCart.quantity + +quantity,
                price: +productDetail.afterDiscount,
                totalAmt: ((+existingCart.quantity + +quantity) * +productDetail.afterDiscount) + +existingCart.deliveryCharge
                }
                existingCart = await orderDetailService.updateSingleRowByFilter({_id:existingCart._id},updateBody)
                message = "Cart updated successfully"
                
            }else{
                // non existing cart
                const existingCart = orderDetailService.transformForNewCartItem(productDetail,quantity,loggedInUser);
                existingCart = await orderDetailService.createOrderDetail(existingCart);
                message = "Cart created successfully"
            }
            res.json({
                data: existingCart,
                message: message,
                status: 'SUCCESS' 
            })
        } catch (exception) {
            next(exception)
            
        }
    }

    async getCartItems(req,res,next){
        try {
            const loggedInUser = req.loggedInUser;
            const filter = {
                order: {$eq:null},
                buyer: loggedInUser._id,
                status:'pending'
            }
            const {data,pegination} = await orderDetailService.getAllRows(filter,{page: +req?.query?.page, limit: +req?.query?.limit})
            res.json({
                data:data,
                message:"Cart items fetched successfully",
                status:"SUCCESS",
                meta:{pegination}
            })
        } catch (exception) {
            next(exception)
            
        }
    }
}

module.exports = new OrderDetailController()