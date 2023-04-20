
const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const newsLetterRoute = require('./routes/newLetter')

    mongoose.set('strictQuery', true);
    mongoose.connect(
        process.env.MONGO_URL
    ).then(() => console.log('DBConnection Succefful'))
        .catch((err) => {
            console.log(err)
        })

//allow OPTIONS on all resources
// app.options('*', cors())
    app.use(cors())
    app.use(express.json())
    app.use('/api/user' , userRoute)
    app.use('/api/auth', authRoute)
    app.use('/api/product', productRoute)
    app.use('/api/newsLetter', newsLetterRoute)

    app.listen(process.env.PORT || port,()=>{
        console.log('Back-End is running on port ' + port)
    })