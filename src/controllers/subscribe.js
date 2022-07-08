const Subscribe = require('../models/Subscribe')
const misc = require('../helpers/misc')

module.exports = {

    getAll: async (request, response) => {

        const page = parseInt(request.query.page) || 1
        const search = request.query.search || ''
        const limit = request.query.limit || 10
        const sort = request.query.sort || 'DESC'
        const sortBy = request.query.sortBy || 'a.createdAt'
        const offset = (page - 1) * limit

        try {
            const total = await Subscribe.getSubscribeCount(search)
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Subscribe.getAll(offset, limit, sort, sortBy, search)
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                element.subscribe = await Subscribe.getSubscribe(element.customer_id)
            }
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
    addSubscribe: async (request, response) => {

        let error = false

        const customer_id = request.body.customer_id
        const product_id = request.body.product_id
        const seller_id = request.body.seller_id
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                const response_status_change = await Subscribe.updateStatusSubscribe(customer_id, product_id, 0, timestamp)
                const response_add = await Subscribe.addSubscribe(customer_id, product_id, seller_id, 1, timestamp)
                const data = {
                    customer_id,
                    product_id,
                    seller_id
                }
                misc.response(response, 200, false, 'Successfull create Subscribe', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    updateSubscribe: async (request, response) => {

        let error = false

        const subscribe_id = request.body.subscribe_id
        const customer_id = request.body.customer_id
        const product_id = request.body.product_id
        const seller_id = request.body.seller_id
        const status = request.body.status
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                await Subscribe.updateSubscribe(subscribe_id, customer_id, product_id, seller_id, status, timestamp)

                const data = {
                    customer_id,
                    product_id,
                    seller_id,
                    status
                }
                misc.response(response, 200, false, 'Successfull update Subscribe', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    deleteSubscribe: async (request, response) => {

        const subscribe_id = request.params.subscribe_id

        try {
            await Subscribe.deleteSubscribe(subscribe_id)
            misc.response(response, 200, false, 'Successfull delete Subscribe')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },
}
