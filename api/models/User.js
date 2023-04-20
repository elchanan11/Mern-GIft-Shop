
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userName:{
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
    }
    ,{ timestamps: true }
)
module.exports = mongoose.model('User', userSchema);