const connection = require('../configs/db')

module.exports = {
    getProductCount: (search) => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from products WHERE name LIKE CONCAT(?,'%')`
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
            id,name,speed 
            FROM products 
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
    getSingleProduct: (product_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,name,speed FROM products WHERE id = '${product_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result[0])
                }
            })
        })
    },
    addProduct: (name, speed, timestamp) => {
        return new Promise((resolve, reject) => {
            let quertext = `name,speed, createdAt`
            let valtext = `'${name}','${speed}','${timestamp}'`

            const query = `INSERT INTO products (${quertext}) VALUES (${valtext})`
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
    updateProduct: (product_id, name, speed, timestamp) => {
        return new Promise((resolve, reject) => {
            let query = ''

            query =  `UPDATE products SET
                name = '${name}',
                speed = '${speed}',
                updatedAt = '${timestamp}'
                WHERE id = '${product_id}'`

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
    deleteProduct: (product_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM products WHERE id = '${product_id}'`
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
