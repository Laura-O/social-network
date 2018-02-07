const db = require('./db.js');

function isFriend(id1, id2) {
    const query = 'SELECT * FROM friends where user_1 = $1 AND user_2 = $2';
    return new Promise((resolve, reject) => {
        db
            .query(query, [id1, id2])
            .then(results => resolve(results.rows[0] ? true : false))
            .catch(err => reject(err));
    });
}

function getUsersById(idArray) {
    const query = 'SELECT id, first, last, profilepicurl FROM users WHERE id = ANY($1)';

    return db.query(query, [idArray]).then(function(results) {
        return results.rows.map(user => {
            const { id, first, last, profilepicurl } = user;
            return {
                id,
                first,
                last,
                profilepicurl,
            };
        });
    });
}

function getUserById(id) {
    const query = 'SELECT id, first, last, email, profilepicurl  FROM users WHERE id = $1';

    return db.query(query, [id]).then(function(results) {
        if (!results) {
            throw 'User not found';
        }
        return {
            id: results.rows[0].id,
            first: results.rows[0].first,
            last: results.rows[0].last,
            email: results.rows[0].email,
            profilePicUrl: results.rows[0].profilepicurl,
        };
    });
}

function getReceived(id) {
    const query =
        'SELECT * FROM friend_requests INNER JOIN users ON friend_requests.sender_id = users.id WHERE friend_requests.receiver_id = $1 AND NOT EXISTS (SELECT * FROM friends WHERE friends.user_1 = friend_requests.sender_id)';

    return new Promise((resolve, reject) => {
        db
            .query(query, [id])
            .then(results => resolve(results.rows))
            .catch(err => reject(err));
    });
}

function getFriends(id) {
    const query =
        'SELECT * FROM friends INNER JOIN users ON friends.user_2 = users.id WHERE friends.user_1 = $1';

    return new Promise((resolve, reject) => {
        db
            .query(query, [id])
            .then(results => resolve(results.rows))
            .catch(err => reject(err));
    });
}

function getRequested(id) {
    const query =
        'SELECT * FROM friend_requests INNER JOIN users ON friend_requests.request_id = users.id WHERE friend_requests.sender_id = $1';

    return new Promise((resolve, reject) => {
        db
            .query(query, [id])
            .then(results => resolve(results.rows))
            .catch(err => reject(err));
    });
}

function pendingFriend(id1, id2) {
    const query = 'SELECT * FROM friend_requests where sender_id = $1 AND receiver_id = $2';
    return new Promise((resolve, reject) => {
        db
            .query(query, [id1, id2])
            .then(results => resolve(results.rows[0] ? true : false))
            .catch(err => reject(err));
    });
}

function sendFriendrequest(id1, id2) {
    const query = 'INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1, $2)';
    return new Promise((resolve, reject) => {
        db
            .query(query, [id1, id2])
            .then(results => resolve(console.log(results)))
            .catch(err => reject(err));
    });
}

function approveRequest(id1, id2) {
    console.log('in approve', id1, id2);
    const query = 'INSERT INTO friends (user_1, user_2) VALUES ($1, $2), ($2, $1)';
    return new Promise((resolve, reject) => {
        db
            .query(query, [id1, id2])
            .then(results => resolve(console.log(results)))
            .catch(err => reject(err));
    });
}

function cancelFriend(id1, id2) {
    const query_1 = 'DELETE FROM friends WHERE user_1 = $1 AND user_2 =  $2';
    const query_2 = 'DELETE FROM friends WHERE user_1 = $2 AND user_2 =  $1';

    return new Promise((resolve, reject) => {
        db
            .query(query_1, [id1, id2])
            .then(
                db
                    .query(query_2, [id1, id2])
                    .then(results => resolve(console.log(results)))
                    .catch(err => console.log(err)),
            )
            .catch(err => reject(err));
    });
}

function cancelRequest(id1, id2) {
    const query_1 = 'DELETE FROM friend_requests WHERE sender_id = $1 AND receiver_id =  $2';
    const query_2 = 'DELETE FROM friend_requests WHERE receiver_id = $1 AND sender_id =  $2';

    return new Promise((resolve, reject) => {
        db
            .query(query_1, [id1, id2])
            .then(
                db
                    .query(query_2, [id1, id2])
                    .then(results => resolve(console.log(results)))
                    .catch(err => console.log(err)),
            )
            .catch(err => reject(err));
    });
}

function getFriendStatus(id1, id2) {
    return new Promise((resolve, reject) => {
        isFriend(id1, id2)
            .then(result => {
                if (result) {
                    resolve('friends');
                } else {
                    pendingFriend(id1, id2)
                        .then(result => {
                            if (result) {
                                resolve('pending');
                            } else {
                                pendingFriend(id2, id1).then(result => {
                                    if (result) {
                                        resolve('request');
                                    } else {
                                        resolve('none');
                                    }
                                });
                            }
                        })
                        .catch(err => reject(err));
                }
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    isFriend,
    sendFriendrequest,
    approveRequest,
    getFriendStatus,
    cancelFriend,
    cancelRequest,
    getRequested,
    getReceived,
    getFriends,
    getUsersById,
    getUserById,
};
