const mongoose = require('mongoose');
const { Status } = require('../../config/constants');
const { create } = require('../user/user.model');

const brandSchema = new mongoose.Schema({
    //structure
    name:{type:String,required:true,min:3,max:50,unique:true},
    slug:{type:String,required:true,unique:true},
    logo:{publicId:String,url:String,thumbUrl:String},
    status:{type:String,enum:Object.values(Status),default:Status.INACTIVE},
    createdBy:{type:mongoose.Types.ObjectId,ref:"User",default:null},
    updatedBy:{type:mongoose.Types.ObjectId,ref:"User",default:null},

},{
    //configuration
    autoCreate:true,
    autoIndex:true,
    timestamps:true

})
const BrandModel = mongoose.model("Brand",brandSchema);
module.exports = BrandModel;