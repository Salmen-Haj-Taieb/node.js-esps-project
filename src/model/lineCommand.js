const mongoose = require('mongoose')

const lineCommand = mongoose.Schema({
    quantity:{
        type:Number,
        required : true
    },
    product:{
        type : mongoose.Types.ObjectId,
        ref : 'product'
    }
})

exports.lineCommand=lineCommand