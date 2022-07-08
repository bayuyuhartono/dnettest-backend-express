const express = require('express')
const Product = require('../controllers/product')
const jwtCheck = require('../helpers/jwt')
const Route = express.Router()

Route
    .get('/', Product.getAll)
    .get('/show/:product_id', Product.getSingleProduct)
    .post('/add',  Product.addProduct)
    .patch('/update',  Product.updateProduct)
    .delete('/delete/:product_id',  Product.deleteProduct)

module.exports = Route
