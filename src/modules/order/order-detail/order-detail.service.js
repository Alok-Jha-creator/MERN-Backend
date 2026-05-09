/* 
const OrderDetailModel = require('./order-detail.model')

class OrderDetailService {
    transformForNewCartItem(productDetail,qty,loggedInUser){
        const orderDetailObj = {
            order:null,
            buyer:loggedInUser._id,
            product: productDetail._id,
            price: productDetail.afterDiscount,
            quantity: +qty,
            deliveryCharge: 0,
            totalAmt: (+qty * productDetail.afterDiscount + 0),
            status: 'pending',
            createdBy: loggedInUser._id,
            seller: productDetail.seller || loggedInUser._id
        }
        return OrderDetailModel.create(orderDetailObj);
    }

    async getSingleRowByFilter(filter){
        try {
            const orderDetail = await OrderDetailModel.findOne(filter)
              .populate("order",
                ["_id","code","date","status","discounts","tax","serviceCharge","deliveryCharge","total","paymentStatus","subTotal"] 
            )
            .populate("product",["_id","name","slug","description","price","discount","afterDiscount","category","brand","seller","isFeatured","images","status"])
            .populate("buyer",["_id","name","role","image","status","email"])
            .populate("seller",["_id","name","role","image","status","email"])
            return orderDetail;
        } catch (exception) {
            throw exception
        }
    } 

    async getAllRows(filter,{page=1,limit=20}){
        try {
            const skip = (page - 1) * limit;
            const data = await OrderDetailModel.find(filter)
            .populate("order",
                ["_id","code","date","status","discounts","tax","serviceCharge","deliveryCharge","total","paymentStatus","subTotal"] 
            )
            .populate("product",["_id","name","slug","description","price","discount","afterDiscount","category","brand","seller","isFeatured","images","status"])
            .populate("buyer",["_id","name","role","image","status","email"])
            .populate("seller",["_id","name","role","image","status","email"])
            .sort({createdAt:'desc'})
            .limit(limit)
            .skip(skip);
          const count =await OrderDetailModel.countDocuments(filter);
          return {data,pegination:{total:count,page:page,limit:limit}}
        } catch (exception) {
            throw exception
            
        }
    }
    async createOrderDetail(orderDetail){
        try {
            const orderDetail = new OrderDetailModel(orderDetail);
             await orderDetail.save();

             return await this.getSingleRowByFilter({_id:orderDetailObj._id})
        } catch (exception) {
            throw exception
            
        }
    }
    async updateSingleRowByFilter(filter,orderDetail){
        try {
           // return await orderDetail.save();   save garne euta tarika 
           await OrderDetailModel.findOneAndUpdate(filter,{$set: orderDetail},{new:true})
           return await this.getSingleRowByFilter(filter)

        } catch (exception) {
            throw exception
            
        }
    }
    async deleteSingleRowByFilter(filter){
        try {
            return await OrderDetailModel.findOneAndDelete(filter);
            
        } catch (exception) {
            throw exception
            
        }
    }
}

module.exports = new OrderDetailService();
*/
const OrderDetailModel = require('./order-detail.model')

class OrderDetailService {
    // ✅ object matra return gara, create nagara
    transformForNewCartItem(productDetail, qty, loggedInUser) {
        return {
            order: null,
            buyer: loggedInUser._id,
            product: productDetail._id,
            price: productDetail.afterDiscount,
            quantity: +qty,
            deliveryCharge: 0,
            totalAmt: (+qty * productDetail.afterDiscount),
            status: 'pending',
            createdBy: loggedInUser._id
        }
    }

    async getSingleRowByFilter(filter) {
        try {
            const orderDetail = await OrderDetailModel.findOne(filter)
                .populate("order", ["_id","code","date","status","discounts","tax","serviceCharge","deliveryCharge","total","paymentStatus","subtotal"])
                .populate("product", ["_id","name","slug","description","price","discount","afterDiscount","category","brand","seller","isFeatured","images","status"])
                .populate("buyer", ["_id","name","role","image","status","email"])
            return orderDetail;
        } catch (exception) {
            throw exception
        }
    }

    async getAllRows(filter, {page=1, limit=20}) {
        try {
            const skip = (page - 1) * limit;
            const data = await OrderDetailModel.find(filter)
                .populate("order", ["_id","code","date","status","discounts","tax","serviceCharge","deliveryCharge","total","paymentStatus","subtotal"])
                .populate("product", ["_id","name","slug","description","price","discount","afterDiscount","category","brand","seller","isFeatured","images","status"])
                .populate("buyer", ["_id","name","role","image","status","email"])
                .sort({createdAt: 'desc'})
                .limit(limit)
                .skip(skip);
            const count = await OrderDetailModel.countDocuments(filter);
            return {data, pagination: {total: count, page: page, limit: limit}}
        } catch (exception) {
            throw exception
        }
    }

    // ✅ variable conflict fix
    async createOrderDetail(data) {
        try {
            const orderDetail = new OrderDetailModel(data);
            await orderDetail.save();
            return await this.getSingleRowByFilter({_id: orderDetail._id}) // ✅
        } catch (exception) {
            throw exception
        }
    }

    async updateSingleRowByFilter(filter, orderDetail) {
        try {
            await OrderDetailModel.findOneAndUpdate(filter, {$set: orderDetail}, {new: true})
            return await this.getSingleRowByFilter(filter)
        } catch (exception) {
            throw exception
        }
    }

    async deleteSingleRowByFilter(filter) {
        try {
            return await OrderDetailModel.findOneAndDelete(filter);
        } catch (exception) {
            throw exception
        }
    }

    // ✅ MISSING FUNCTION ADD GARYO
    async assignOrderToCart(cartDetail, orderObj) {
        try {
            let updateData = [];
            cartDetail.map((item) => {
                const price = item.product.afterDiscount;
                const totalAmt = (price * item.quantity) + item.deliveryCharge;
                updateData.push(
                    OrderDetailModel.findByIdAndUpdate(
                        item._id,
                        {
                            $set: {
                                price: price,
                                order: orderObj._id,
                                status: 'ordered',
                                totalAmt: totalAmt
                            }
                        },
                        {new: true}
                    )
                );
            });
            await Promise.all(updateData);
            return true;
        } catch (exception) {
            throw exception;
        }
    }
}

module.exports = new OrderDetailService();