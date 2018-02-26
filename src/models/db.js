const Pool = require('pg-pool');

const config = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'bla',
    database: 'social'
};

const pool = new Pool(config);
pool.on('error', err => {
    console.log(err);
});

/**
 * Generic method for db queries
 * @param sql SQL query
 * @param params array with parameters
 */
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.connect().then(client => {
            client
                .query(sql, params)
                .then(results => {
                    resolve(results);
                    client.release();
                })
                .catch(err => {
                    reject(err);
                    client.release();
                    console.error('query error', err.message, err.stack);
                });
        });
    });
};

module.exports = {
    query,
    pool
};
