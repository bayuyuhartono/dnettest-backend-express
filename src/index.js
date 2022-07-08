const express = require('express')
const auth = require('./routes/auth')
const user = require('./routes/user')
const product = require('./routes/product')
const customer = require('./routes/customer')
const subscribe = require('./routes/subscribe')
const Route = express.Router()

Route
    .use('/api/v1/auth', auth)
    .use('/api/v1/user', user)
    .use('/api/v1/product', product)
    .use('/api/v1/customer', customer)
    .use('/api/v1/subscribe', subscribe)

module.exports = Route
