const express = require('express');
const router = express.Router();
const db = require('../src/models/db.js');
const friendship = require('../src/models/friendship.js');
const middleware = require('../middleware/user.js');

router.get('/getProfile/:id', middleware.requireUser, function(req, res) {
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

router.post('/savePost', function(req, res) {
    const { title, content } = req.body;
    const user_id = req.session.user.id;

    const query = 'INSERT into posts (user_id, title, content) VALUES ($1, $2, $3)';
    db
        .query(query, [user_id, title, content])
        .then(function(results) {
            console.log(results);
            res.json({ success: true });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/getPosts/:id', function(req, res) {
    console.log('in get post route', req.params.id);
    const id = req.params.id;

    const query = 'SELECT * from posts WHERE user_id = $1';
    db.query(query, [id]).then(results => {
        console.log(results);
        res.json(results.rows);
    });
});

module.exports = router;
