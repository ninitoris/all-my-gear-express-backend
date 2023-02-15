const Pool = require('pg').Pool
const pool = new Pool({
    user: 'stewie',
    password: 'Govno123',
    host: 'localhost',
    port: 5432,
    database: 'all_my_gear_db'

})

module.exports = pool