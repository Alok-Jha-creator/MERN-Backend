const mongoose = require('mongoose');

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
    phone:{
        type:String,
        require:true
    },
    role:{
        
    },
    gender:"",
    dob:"",
    address:"",
    image:"",

    activationToken:"",
    expiryTime:"",
    status:""
})

const UserModel = mongoose.model("",UserSchema)
module.exports = UserModel;