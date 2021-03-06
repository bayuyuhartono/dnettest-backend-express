const express = require('express')
const User = require('../controllers/user')
const jwtCheck = require('../helpers/jwt')
const Route = express.Router()

Route.get('/', User.getAll)
    .get('/show/:user_id', User.getSingleUser)
    .post('/add',  User.addUser)
    .patch('/update',  User.updateUser)
    .delete('/delete/:user_id',  User.deleteUser)

module.exports = Route
