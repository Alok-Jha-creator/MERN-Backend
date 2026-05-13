const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    
    order: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },
    TransactionCode:{
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'cancelled', 'pending'],
    },
    data:String,
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
}
,{
    timestamps: true,
    autoIndex: true,
    autoCreate: true
}
);


const TransactionModel = mongoose.model('Transaction', TransactionSchema);
module.exports = TransactionModel;