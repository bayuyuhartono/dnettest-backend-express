const express = require('express')
const bodyParser = require('body-parser')
const config = require('./src/configs/configs')
const cors = require('cors')
const main = express()
const port = config.port
const routerNav = require('./src/index')
const timest = require('express-timestamp')

main.use(express.static('public'))

main.use(cors())

main.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));
main.use(bodyParser.json())

main.use(timest.init)
main.use('/', routerNav)

main.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})

main.get('*', (request, response) => {
    response.sendStatus(404)
})

module.exports = main
