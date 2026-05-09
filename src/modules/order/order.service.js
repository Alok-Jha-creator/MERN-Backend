const { randomStringGenerator } = require("../../utilities/helpers");

class OrderService{
    createOrderObj(cartDetail,loggedInUser){
        try {
            let CartIds = cartDetail.map((item) => item._id);
            let orderObj ={
                buyer:loggedInUser._id,
                code:randomStringGenerator(10).toLocaleUpperCase(),
                detail: CartIds,
                date:Date.now(),
                subtotal:0,
                discounts:0,
                serviceCharge:0,
                deliveryCharge:0,
                total:0,
                status:'new',
                paymentStatus:false,
                createdBy: loggedInUser._id

            }
        } catch (exception) {
            throw exception
            
        }
    }
}

module.exports = new OrderService();