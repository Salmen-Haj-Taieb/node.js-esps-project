const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        require:true,
        default:"user"
    },
    verified:{
        default:false,
        type:Boolean,
    },
    verificationCode:{
        type:String,
        required:false,
    }, 
} , { timestamps:true})

module.exports.User= mongoose.model('user', userSchema)