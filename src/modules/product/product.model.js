const mongoose = require('mongoose');
const { Status } = require('../../config/constants');
const { required } = require('joi');

const ProductSchema = new mongoose.Schema({
    //structure
    name:{type:String,required:true,min:3,max:150},
    slug:{type:String,required:true,unique:true},
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        min:10000,
        required:true,
    },
    discount:{
        type:Number,
         min:0,
         max:90,
         default:0,
    }, 
    afterDiscount:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        default:null,
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand",
        default:null,
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isFeatured:{type:Boolean,},
    images:[{publicId:String,url:String,thumbUrl:String}],
    status:{type:String,enum:Object.values(Status),default:Status.INACTIVE},
    createdBy:{type:mongoose.Types.ObjectId,ref:"User",default:null},
    updatedBy:{type:mongoose.Types.ObjectId,ref:"User",default:null},
},{
    //configuration
    autoCreate:true,
    autoIndex:true,
    timestamps:true
})
const ProductModel = mongoose.model("Product",ProductSchema);
module.exports = ProductModel;