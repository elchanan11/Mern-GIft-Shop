
const router = require('express').Router();
const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require("crypto-js");
const Process = require("process");
const Product = require('../models/Products')
const cors = require('cors')

    //CREATE PRODUCT
    router.post('/', verifyTokenAndAdmin,async (req,res)=>{
        const newProduct = new Product(req.body)
        
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        }catch (e) {
            res.status(501).json(e)
        }
    })

    //UPDATE PRODUCT
    router.put('/:id',verifyTokenAndAdmin, async (req, res)=>{
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {new:true}
            )
            res.status(200).json(updatedProduct)
        }catch (err){
            res.status(500).json(err)
        }
    })

//DELETE Product
    router.delete('/:id', verifyTokenAndAuthorization,async (req, res)=>{
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Product has been delete')
        }catch (err){
            res.status(501).json(err)
        }
    })

    //GET  Product
    router.get('/find/:id',async (req, res)=>{
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }catch (err){
            res.status(501).json(err)
        }
    })

//GET ALL Products
    router.get('/',async (req, res)=>{
        const qNew = req.query.new;
        const qCategory = req.query.category
        console.log('xx')
        try {
            let products;
            if (qNew){
                products = await Product.find({}).sort({createdAt: -1}).limit(5)
            }else if (qCategory){
                products = await Product.find({
                    category: {
                        $in: [qCategory]
                    }
                })
            }else {
                products = await Product.find()
            }

            res.status(200).json(products)
        }catch (err){
            res.status(501).json(err)
        }
    })


    router.get('/search',async (req, res)=>{
        const qFilter = String(req.query.filter)

        const filteredProducts = await Product.find({title: {$regex:qFilter}}).limit(4)
        res.json(filteredProducts)
    })

module.exports = router;