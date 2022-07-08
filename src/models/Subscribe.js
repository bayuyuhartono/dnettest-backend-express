const connection = require('../configs/db')

module.exports = {
    getSubscribeCount: (search) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total 
            FROM subscribes a
            INNER JOIN customers b ON b.id = a.customer_id
            INNER JOIN products c ON c.id = a.product_id
            INNER JOIN users d ON d.id = a.seller_id
            WHERE b.name LIKE CONCAT(?,'%') AND status = 1`
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
                b.id as customer_id
                ,b.name as customer_name
            FROM subscribes a 
            INNER JOIN customers b ON b.id = a.customer_id
            INNER JOIN products c ON c.id = a.product_id
            WHERE b.name LIKE '%${search}%' AND status = 1 
            GROUP BY b.id 
            ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}
            `
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getSubscribe: (customer_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT 
                a.id as subscribe_id
                ,b.name as customer_name
                ,c.name product_name
                ,c.speed speed
                ,a.status 
                ,a.createdAt 
            FROM subscribes a 
            INNER JOIN customers b ON b.id = a.customer_id
            INNER JOIN products c ON c.id = a.product_id
            WHERE a.customer_id = '${customer_id}' AND status = 1 
            `
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addSubscribe: (customer_id, product_id, seller_id, status, timestamp) => {
        return new Promise((resolve, reject) => {
            let quertext = `customer_id, product_id, status, createdAt`
            let valtext = `'${customer_id}','${product_id}','${status}','${timestamp}'`

            const query = `INSERT INTO subscribes (${quertext}) VALUES (${valtext})`
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
    updateSubscribe: (subscribe_id, customer_id, product_id, seller_id, status, timestamp) => {
        return new Promise((resolve, reject) => {
            let query = ''

            query =  `UPDATE subscribes SET
                customer_id = '${customer_id}',
                product_id = '${product_id}',
                status = '${status}',
                updatedAt = '${timestamp}'
                WHERE id = '${subscribe_id}'`

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
    updateStatusSubscribe: (customer_id, product_id, status, timestamp) => {
        return new Promise((resolve, reject) => {
            let query = ''

            query =  `UPDATE subscribes SET
                status = '${status}',
                updatedAt = '${timestamp}'
                WHERE customer_id = '${customer_id}' AND product_id = '${product_id}'`

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
    deleteSubscribe: (subscribe_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM subscribes WHERE id = '${subscribe_id}'`
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
