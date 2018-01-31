const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./src/actions/db.js');
const password = require('./src/actions/password.js');
const user = require('./src/actions/user.js');

app.use(compression());
app.use(bodyParser.json());
app.use(
    cookieSession({
        secret: 'secret',
        maxAge: 1000 * 60 * 60 * 24 * 14,
    }),
);
app.use(express.static('public'));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/',
        }),
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/welcome', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/user', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.json(req.session.user);
    }
});

app.get('/clearsession', function(req, res) {
    req.session = null;
    res.redirect('/');
});

app.post('/register', function(req, res) {
    const { first, last, email, pass } = req.body;
    const query = 'INSERT INTO users (first, last, email, pass) VALUES ($1, $2, $3, $4)';

    password.hashPassword(pass).then(hashedPassword => {
        db
            .query(query, [first, last, email, hashedPassword])
            .then(function() {
                req.session.user = true;
                res.json({ success: true });
            })
            .catch(function(err) {
                console.log(err);
            });
    });
});

app.post('/login', function(req, res) {
    const { email, pass } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';

    db
        .query(query, [email])
        .then(function(results) {
            password
                .checkPassword(pass, results.rows[0].pass)
                .then(result => {
                    console.log(results.rows[0]);
                    req.session.user = results.rows[0];
                    res.json({ success: true });
                })
                .catch(err => {
                    console.log('query error', err.message, err.stack);
                });
            // res.json({ success: true });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
