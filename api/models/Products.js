
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        title:{
            type: String,
        },
        desc: {
            type: String,
        },
        category:{
            type: Array,
        },
        img:{
            type: Array,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },
        updatedPrice:{
            type: String,
            required: true,
        },
        isRecommended:{
            type: Boolean,
            default: false,
        },
        inStock:{
            type:Boolean,
            default: true
        }
    }
    ,{ timestamps: true }
)
module.exports = mongoose.model('Product', productSchema);