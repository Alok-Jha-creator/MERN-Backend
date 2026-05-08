const mongoose = require('mongoose');
const OrderModel = require('../order.model');
const OrderDetailSchema = new mongoose.Schema({
    // cart feature, if order is null status is pending -> cart, if order is not null -> order item
    order: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Order', 
        default: null 
    },
    buyer: {
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    product: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true,
        min: 1
    },
    price: { 
        type: Number, 
        required: true
    },
    totalAmt: { 
        type: Number, 
        required: true
    },
    deliveryCharge: { 
        type: Number, 
        min: 0,
        default: 0 
    },
    status: { 
        type: String, 
        enum: ['pending', 'ordered', 'completed'], 
        default: 'pending' 
    },
    createdBy: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        default: null 
    },
    updatedBy: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        default: null 
    }
},{
timestamps: true,
autoIndex: true,
autoCreate: true
}
);

const OrderDetailModel = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetailModel; 