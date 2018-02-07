const express = require('express');
const router = express.Router();
const db = require('../src/models/db.js');
const friendship = require('../src/models/friendship.js');

router.get('/getProfile/:id', requireUser, function(req, res) {
    const id = req.params.id;
    if (id == req.session.user.id) {
        // res.redirect('/');
        return res.json({ loggedInUsersOwnProfile: true });
    } else {
        const query = 'SELECT bio, first, last, profilepicurl FROM users WHERE id = $1';
        db
            .query(query, [id])
            .then(results => {
                res.json(results.rows[0]);
            })
            .catch(err => console.log(err));
    }
});

router.post('/updateBio', function(req, res) {
    const { bio, id } = req.body;
    const query = 'UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio';
    db
        .query(query, [bio, id])
        .then(function(results) {
            console.log(results);
            req.session.user.bio = results.rows[0].bio;
            res.json({ success: true, bio: results.rows[0].bio });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/getFriends', function(req, res) {
    console.log('getfriends route');
    friendship
        .getFriends(req.session.user.id)
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
