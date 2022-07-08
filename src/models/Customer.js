const connection = require('../configs/db')

module.exports = {
    getCustomerCount: (search) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from customers WHERE name LIKE CONCAT(?,'%')`
            const qvalues = [search]
            connection.query(query, qvalues, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getAll: (offset, limit, sort, sortBy, search) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT 
            id,name,nik,phone,address 
            FROM customers 
            WHERE name LIKE '%${search}%'
            ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getSingleCustomer: (customer_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,name,nik,phone,address FROM customers WHERE id = '${customer_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result[0])
                }
            })
        })
    },
    addCustomer: (name, nik,phone,address, timestamp) => {
        return new Promise((resolve, reject) => {
            let quertext = `name,nik,phone,address,createdAt`
            let valtext = `'${name}','${nik}','${phone}','${address}','${timestamp}'`

            const query = `INSERT INTO customers (${quertext}) VALUES (${valtext})`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    updateCustomer: (customer_id, name, nik,phone,address, timestamp) => {
        return new Promise((resolve, reject) => {
            let query = ''

            query =  `UPDATE customers SET
                name = '${name}',
                nik = '${nik}',
                phone = '${phone}',
                address = '${address}',
                updatedAt = '${timestamp}'
                WHERE id = '${customer_id}'`

            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    deleteCustomer: (customer_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM customers WHERE id = '${customer_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
}
