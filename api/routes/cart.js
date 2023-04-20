
const router = require('express').Router();
const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const Process = require("process");
const Cart = require('../models/Cart')
const Product = require("../models/Products");

//CREATE
router.post('/', verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch (e) {
        res.status(501).json(e)
    }})

//UPDATE
router.put('/:id',verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        res.status(200).json(updatedCart)
    }catch (err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization,async (req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been delete')
    }catch (err){
        res.status(501).json(err)
    }
})

//GET  User Cart
router.get('/find/:userId',verifyTokenAndAuthorization,async (req, res)=>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    }catch (err){
        res.status(501).json(err)
    }
})

// GET ALL
router.get('',verifyTokenAndAdmin,async (req, res)=>{
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    }catch (err){
        res.status(501).json(err)
    }
})