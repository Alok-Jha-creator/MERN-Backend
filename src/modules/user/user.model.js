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
    image:"",

    activationToken:"",
    expiryTime:"",
    status:""
})

const UserModel = mongoose.model("",UserSchema)
module.exports = UserModel;