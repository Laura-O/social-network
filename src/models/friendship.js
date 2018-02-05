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
    const query = 'INSERT INTO friends (sender_id, receiver_id) VALUES ($1, $2) ($2, $1)';
    return new Promise((resolve, reject) => {
        db
            .query(query, [id1, id2])
            .then(results => resolve(console.log(results)))
            .catch(err => reject(err));
    });
}

function cancelFriend(id1, id2) {
    console.log('in cancel friend function');
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
    const query_2 = 'DELETE FROM friend_requests WHERE receiver_id = $2 AND sender_id =  $1';

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
};
