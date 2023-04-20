
const router = require('express').Router();
const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const https = require("https");


router.post("/",function (req, res){
    // const fn = req.body.firstname
    // const ln = req.body.lastname
    const email = req.body.email
    console.log(email)

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            // merge_fields: {
            //     FNAME: fn,
            //     LNAME: ln
            // }
        }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = `https://us21.api.mailchimp.com/3.0/lists/${process.env.MAIL_CHIMP_AUDIENCE_ID}`

    const options = {
        method: "POST",
        auth: `Elchanan:${process.env.MAIL_CHIMP_API}`
    }

    const request = https.request(url,options,function (response){

        if (response.statusCode === 200){
            res.status(200).json("success")
        }else {
            res.status(300).json( "faliure")
        }
        response.on("data", function (data){
            console.log(JSON.parse(data))
            f = JSON.parse(data)
            console.log(f.data)
        })
    })

    request.write(jsonData)
    request.end()

})

module.exports = router;