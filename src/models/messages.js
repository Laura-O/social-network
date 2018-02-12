const db = require('./db.js');

function addMessage(userId, message) {
    const query = 'INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING id';
    return new Promise((resolve, reject) => {
        db
            .query(query, [userId, message])
            .then(results => resolve(results.rows[0].id))
            .catch(err => reject(err));
    });
}

module.exports = {
    addMessage,
};
