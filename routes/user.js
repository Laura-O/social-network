const express = require('express');
const router = express.Router();

const friendship = require('../src/models/friendship.js');

router.get('/getFriendship/:id', requireUser, function(req, res) {
    const userId = req.session.user.id;
    const friendId = req.params.id;

    friendship
        .isFriend(userId, friendId)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.get('/getFriendshipStatus/:id', requireUser, function(req, res) {
    const userId = req.session.user.id;
    const friendId = req.params.id;

    friendship
        .getFriendStatus(userId, friendId)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/sendFriendrequest', requireUser, function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;

    friendship
        .sendFriendrequest(id, friend_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/approveRequest', requireUser, function(req, res) {
    const id = req.session.user.id;
    const friend_id = req.body.friend_id;

    friendship
        .approveRequest(id, friend_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => console.log(err));
});

router.post('/cancelFriendship', requireUser, function(req, res) {
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

function requireUser(req, res, next) {
    if (!req.session.user) {
        res.sendStatus(403);
    } else {
        next();
    }
}

module.exports = router;
