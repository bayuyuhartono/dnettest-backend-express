const Product = require('../models/Product')
const misc = require('../helpers/misc')

module.exports = {

    getAll: async (request, response) => {

            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'createdAt'
            const offset = (page - 1) * limit
        try {
            const total = await Product.getProductCount(search)
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Product.getAll(offset, limit, sort, sortBy, search)

            if (data.length == 0) {
                return misc.response(response, 400, false, 'Data not found')
            }

            let pageDetail = {
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `${request.get('host')}${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `${request.get('host')}${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            }

            misc.responsePagination(response, 200, false, 'Successfull get all data', pageDetail, data, request.originalUrl)
        } catch (error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    getSingleProduct: async (request, response) => {

        const product_id = request.params.product_id

        try {
            const data = await Product.getSingleProduct(product_id)
            if (!data) {
                return misc.response(response, 400, false, 'Data not found')
            }
            
            misc.response(response, 200, false, 'Successfull get single Product', data, request.originalUrl)

        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    addProduct: async (request, response) => {

        let error = false

        const name = request.body.name
        const speed = request.body.speed
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                const response_add = await Product.addProduct(name, speed, timestamp)
                const data = {
                    name,
                    speed
                }
                misc.response(response, 200, false, 'Successfull create Product', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    updateProduct: async (request, response) => {

        let error = false

        const product_id = request.body.product_id
        const name = request.body.name
        const speed = request.body.speed
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                await Product.updateProduct(product_id, name, speed, timestamp)

                const data = {
                    name,
                    speed,
                }
                misc.response(response, 200, false, 'Successfull update Product', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    deleteProduct: async (request, response) => {

        const product_id = request.params.product_id

        try {
            await Product.deleteProduct(product_id)
            misc.response(response, 200, false, 'Successfull delete Product')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },
}
