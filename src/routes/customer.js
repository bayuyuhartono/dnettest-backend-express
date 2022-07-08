const express = require('express')
const Customer = require('../controllers/customer')
const jwtCheck = require('../helpers/jwt')
const Route = express.Router()

Route
    .get('/', Customer.getAll)
    .get('/show/:customer_id', Customer.getSingleCustomer)
    .post('/add',  Customer.addCustomer)
    .patch('/update',  Customer.updateCustomer)
    .delete('/delete/:customer_id',  Customer.deleteCustomer)

module.exports = Route
