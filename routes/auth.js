const express = require('express');
const router = express.Router();

const db = require('../src/models/db.js');
const password = require('../src/models/password.js');

router.post('/register', function(req, res) {
    const { first, last, email, pass } = req.body;
    const query = 'INSERT INTO users (first, last, email, pass) VALUES ($1, $2, $3, $4)';

    password.hashPassword(pass).then(hashedPassword => {
        db
            .query(query, [first, last, email, hashedPassword])
            .then(function() {
                req.session.user = true;
                res.json({ success: true, bio: results.rows[0].bio });
            })
            .catch(function(err) {
                console.log(err);
            });
    });
});

router.post('/login', function(req, res) {
    const { email, pass } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';

    db
        .query(query, [email])
        .then(function(results) {
            password
                .checkPassword(pass, results.rows[0].pass)
                .then(result => {
                    req.session.user = results.rows[0];
                    res.json({ success: true });
                })
                .catch(err => {
                    console.log('query error', err.message, err.stack);
                });
        })
        .catch(function(err) {
            console.log(err);
        });
});

router.get('/clearsession', function(req, res) {
    req.session = null;
    res.redirect('/');
});

module.exports = router;
