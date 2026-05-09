const mongoose = require('mongoose');
const OrderDetailModel = require('./order-detail/order-detail.model');

const OrderSchema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    detail: [{
        type: mongoose.Types.ObjectId,
        ref: 'OrderDetail',
    }],
    date: {
        type: Date,
        default: Date.now
    },
    subtotal: {
        type: Number,
        required: true
    },
    discounts: {
        type: Number,
        min: 0,
        default: 0
    },
    tax: {
        type: Number,
    },
    serviceCharge: {
        type: Number,
        min: 0,
        default: 0
    },
    deliveryCharge: {
        type: Number,
        min: 0,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'process', 'delivered', 'cancelled'],
        default: 'new'
    },
    paymentStatus: {
        type: Boolean,     
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
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
    },
}, {
    timestamps: true,       
    autoCreate: true,
    autoIndex: true
});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;