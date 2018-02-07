const express = require('express');
const router = express.Router();

const friendship = require('../src/models/friendship.js');
const middleware = require('../middleware/user.js');

router.get('/getFriendship/:id', middleware.requireUser, function(req, res) {
    const userId = req.session.user.id;
    const friendId = req.params.id;

    friendship
        .isFriend(userId, friendId)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.get('/getFriendshipStatus/:id', middleware.requireUser, function(req, res) {
    const userId = req.session.user.id;
    const friendId = req.params.id;

    friendship
        .getFriendStatus(userId, friendId)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/sendFriendrequest', middleware.requireUser, function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;

    friendship
        .sendFriendrequest(id, friend_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/approveRequest', middleware.requireUser, function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;

    friendship
        .approveRequest(id, friend_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/cancelFriendship', middleware.requireUser, function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;
    console.log('cancel friendship route');

    friendship
        .cancelFriend(id, friend_id)
        .then(results => {
            friendship
                .cancelRequest(id, friend_id)
                .then(results => {
                    res.json(results);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

router.post('/cancelRequest', function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;

    friendship
        .cancelRequest(id, friend_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.get('/getFriendrequests', function(req, res) {
    console.log('getfriendrequests route');
    friendship
        .getReceived(req.session.user.id)
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(err => console.log(err));
});

module.exports = router;
