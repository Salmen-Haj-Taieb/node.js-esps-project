const mongoose =require('mongoose')
const lineCommand = require('./lineCommand')
const commandSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'user'
    },
    products:[
        lineCommand
    ],
    price:{
        type : Number,
        required : true
    }
},{ timestamps:true})

module.exports.Command= mongoose.model('command', commandSchema)