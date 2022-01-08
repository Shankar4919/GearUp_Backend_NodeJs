
const { createPool } = require('mysql2/promise');


module.exports = connect = async () => {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'gearup',
        connectionLimit: 10
    });

    return connection;

}