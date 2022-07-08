const express = require('express')
const Subscribe = require('../controllers/subscribe')
const jwtCheck = require('../helpers/jwt')
const Route = express.Router()

Route
    .get('/', Subscribe.getAll)
    .post('/add',  Subscribe.addSubscribe)
    .patch('/update',  Subscribe.updateSubscribe)
    .delete('/delete/:subscribe_id',  Subscribe.deleteSubscribe)

module.exports = Route
