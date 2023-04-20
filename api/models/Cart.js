
const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: false
        },
        products: [
            {
                productId:{
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            },
        ]
    }
    ,{ timeStamp: true }
)
module.exports = mongoose.model('Cart', cartSchema);