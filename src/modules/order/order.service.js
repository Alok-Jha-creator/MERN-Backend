const { randomStringGenerator } = require("../../utilities/helpers");
const OrderModel = require("./order.model");

class OrderService{
    orderCalculation(cartDetail){
        let calculations ={
            subtotal:0,
            discounts:0,
            serviceCharge:0,
            deliveryCharge:0,
            total:0,
        };
            let subtotal = 0;
            let deliveryCharge = 0;
        if(cartDetail){
            cartDetail.map((item)=>{
                subtotal += (item.quantity * item.product.afterDiscount)
                deliveryCharge += item.deliveryCharge
            })
        }
        let beforetax = subtotal - 0 + subtotal*0.1 + deliveryCharge
        calculations ={
            subtotal:subtotal,
            discounts:0,
            serviceCharge: subtotal*0.10,
            deliveryCharge:deliveryCharge,
            tax: beforetax*0.13,
            total: beforetax + beforetax*0.13
        }
        return calculations
    }
    createOrderObj(cartDetail,loggedInUser){
        try {
            let CartIds = cartDetail.map((item) => item._id);
            let orderObj ={
                buyer:loggedInUser._id,
                code:randomStringGenerator(10).toLocaleUpperCase(),
                detail: CartIds,
                date:Date.now(),
                
                ...this.orderCalculation(cartDetail),

                status:'new',
                paymentStatus:false,
                createdBy: loggedInUser._id
            }
            return orderObj
        } catch (exception) {
            throw exception
            
        }
    }
    async getSingleRowByFilter(filter){
        try {
            const data = await OrderModel.findOne(filter)
            .populate("buyer",["_id","name","role","image","status","email"])
            .populate("detail",["_id","product","quantity","price","deliveryCharge","totalAmt","status","createdAt","buyer","seller"])
            .populate("createdBy",["_id","name","role","image","status","email"])
            .populate("createdBy",["_id","name","role","image","status","email"])
            return data;
        } catch (exception) {
             throw exception
            
        }
    }
    async getAllRows(filter,{page=1,limit=20}){
        try {
            let skip = (page - 1) * limit;
            const data = await OrderModel.find(filter)
            .populate("buyer",["_id","name","role","image","status","email"])
            .populate("detail",["_id","product","quantity","price","deliveryCharge","totalAmt","status","createdAt","buyer","seller"])
            .populate("createdBy",["_id","name","role","image","status","email"])
            .populate("createdBy",["_id","name","role","image","status","email"])
            .sort({createdAt:'desc'})
            .skip(skip)
            .limit(limit)
            const total = await OrderModel.countDocuments(filter);
            return {data,pegination:{total:total,page:page,limit:limit}}
        } catch (exception) {
             throw exception
            
        }
    }

    async storeOrder(orderObj){
        try {
            const order = new OrderModel(orderObj);
            await order.save();
            return await this.getSingleRowByFilter({_id:order._id})
        } catch (exception) {
             throw exception
            
        }
    }
    async assignOrderToCart(cartDetail, orderObj) {
        try {
            let updateData = [];
            cartDetail.map((item) => {
                const price = item.product.afterDiscount;
                const totalAmt = (price * item.quantity) + item.deliveryCharge;
    
                updateData.push(
                    OrderDetailModel.findByIdAndUpdate(
                        item._id,  // ✅ findByIdAndUpdate use gara
                        {
                            $set: {
                                price: price,
                                order: orderObj._id,
                                status: 'ordered',
                                totalAmt: totalAmt
                            }
                        },
                        { new: true }
                    )
                );
            });
            await Promise.all(updateData);
            return true;
        } catch (exception) {
            throw exception;
        }
    }
   
    async orderDeleteById(id){
        try {
            const orderDel = await OrderModel.findOneAndDelete({_id:id});  
            await OrderDetailModel.deleteMany({order:id});
            return orderDel;
        } catch (exception) {
            next(exception)
            
        }
    }
}

module.exports = new OrderService();