const mongoose = require('mongoose');
const { userRoles, Gender } = require('../../config/constants');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:String,
    role:{
        type:String,
        //enum:["admin","customer","seller"]
        enum:Object.values(userRoles),
        default:userRoles.CUSTOMER
    },
    gender:{
        type:String,
        enum:Object.values(Gender),
        default: null
    },
    dob:Date,
    address:String,
    image:{
        public_id: String,
        secure_url: String,
        thumUrl: String
    },

    activationToken:String,
    expiryTime:Date,
    status:{
        type:String,
        enum:Object.values(Status),
        default:Status.INACTIVE
    },
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})

const UserModel = mongoose.model("",UserSchema)
module.exports = UserModel;