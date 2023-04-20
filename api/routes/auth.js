
const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const Process = require("process");
const jwt = require('jsonwebtoken')

//REGISTER
    router.post('/register', async (req, res) => {
        if (req.body.email && req.body.password){
            const newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    Process.env.PASS_SEC
                ).toString(),
            })
            try {
                const savedUser = await newUser.save()
                res.status(201).json(newUser)
            }catch (err){
                res.status(500).json(err)
            }
        }else {
            res.status(501).json('Enter Password or email')
        }
    })

//LOGIN
    router.post('/login', async (req, res) =>{

        try {
            const user = await User.findOne({email: req.body.email})
            if (user){
                const hashedPassword =  CryptoJS.AES.decrypt(
                    user.password,
                    process.env.PASS_SEC
                )
                const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

                if (originalPassword === req.body.password){
                    const accessToken = jwt.sign(
                        {
                            id: user._id,
                            isAdmin: user.isAdmin
                        },
                        process.env.JWT_SEC,
                        {expiresIn: "3d"}
                    )

                    const {password,...others} = user._doc;

                    res.status(200).json(
                        {
                            ...others,
                            accessToken
                        }
                    )
                }else {
                    res.status(502).json('Wrong Password')
                }
            }else {
                res.status(507).json('user not found')
            }
        }catch (err){
            res.status(500).json(err)
        }
    })

module.exports = router;