const Customer = require('../models/Customer')
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
            const total = await Customer.getCustomerCount(search)
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Customer.getAll(offset, limit, sort, sortBy, search)

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

    getSingleCustomer: async (request, response) => {

        const customer_id = request.params.customer_id

        try {
            const data = await Customer.getSingleCustomer(customer_id)
            if (!data) {
                return misc.response(response, 400, false, 'Data not found')
            }
            
            misc.response(response, 200, false, 'Successfull get single Customer', data, request.originalUrl)

        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    addCustomer: async (request, response) => {

        let error = false

        const name = request.body.name
        const nik = request.body.nik
        const phone = request.body.phone
        const address = request.body.address
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                const response_add = await Customer.addCustomer(name, nik, phone, address, timestamp)
                const data = {
                    name,
                    nik,
                    phone,
                    address,
                }
                misc.response(response, 200, false, 'Successfull create Customer', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    updateCustomer: async (request, response) => {

        let error = false

        const customer_id = request.body.customer_id
        const name = request.body.name
        const nik = request.body.nik
        const phone = request.body.phone
        const address = request.body.address
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        try {
            if(error === false) {
                await Customer.updateCustomer(customer_id, name, nik, phone, address, timestamp)

                const data = {
                    name,
                    nik,
                    phone,
                    address,
                }
                misc.response(response, 200, false, 'Successfull update Customer', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },
    deleteCustomer: async (request, response) => {

        const customer_id = request.params.customer_id

        try {
            await Customer.deleteCustomer(customer_id)
            misc.response(response, 200, false, 'Successfull delete Customer')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },
}
