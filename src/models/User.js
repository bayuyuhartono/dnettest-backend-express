const connection = require('../configs/db')

module.exports = {
    getUserCount: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from users`
            connection.query(query, (error, result) => {
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
            id,fullname,username,email,phone
            FROM users 
            WHERE username LIKE '%${search}%'
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
    getSingleUser: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT id,fullname,username,email,phone FROM users WHERE id = '${user_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result[0])
                }
            })
        })
    },
    addUser: (fullname, username, email, phone, password, timestamp) => {
        return new Promise((resolve, reject) => {
            let quertext = `fullname, username, email, phone, password, createdAt`
            let valtext = `'${fullname}', '${username}', '${email}', '${phone}', '${password}', '${timestamp}'`

            const query = `INSERT INTO users (${quertext}) VALUES (${valtext})`
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
    updateUser: (user_id, fullname, username, email, phone, password, timestamp) => {
        return new Promise((resolve, reject) => {
            let query = ''

            query =  `UPDATE users SET
                fullname = '${fullname}',
                username = '${username}',
                email = '${email}',
                phone = '${phone}',
                password = '${password}',
                updatedAt = '${timestamp}'
                WHERE id = '${user_id}'`

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
    deleteUser: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM users WHERE id = '${user_id}'`
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
