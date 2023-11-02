const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim:true,
        required: true

    },

    price:{
        type:Number,
        trim:true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    }
})

module.exports= mongoose.model('Product', productSchema);