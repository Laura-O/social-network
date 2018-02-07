const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./src/models/db.js');
const password = require('./src/models/password.js');
const user = require('./src/models/user.js');
const friendship = require('./src/models/friendship.js');

const csurf = require('csurf');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const profileRoutes = require('./routes/profile.js');
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const uploadRoutes = require('./routes/upload.js');

const socket = require('./src/models/socket.js');

app.use(compression());
app.use(bodyParser.json());
app.use(
    cookieSession({
        secret: 'secret',
        maxAge: 1000 * 60 * 60 * 24 * 14,
    }),
);
app.use(express.static('public'));

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(userRoutes);
app.use(profileRoutes);
app.use(authRoutes);
app.use(uploadRoutes);

socket(app, io);

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

app.get('/getUser', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.json(req.session.user);
    }
});

app.get('*', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

// let onlineUsers = [];

// app.post('/connect/:socketId', function(req, res) {
//     const socketId = req.params.socketId;
//     const userId = req.session.user.id;

//     const currentSocket = onlineUsers.find(socket => socket === socketId);

//     if (!currentSocket) {
//         onlineUsers.push({
//             userId,
//             socketId,
//         });

//         const onlineIds = onlineUsers.map(user => user.userId);

//         friendship
//             .getUsersById(onlineIds)
//             .then(users => {
//                 io.sockets.sockets[socketId].emit('onlineUsers', users);
//                 res.json(users);
//             })
//             .catch(err => console.log(err));
//     }
// });

// // midleware
// function requireUser(req, res, next) {
//     if (!req.session.user) {
//         res.sendStatus(403);
//     } else {
//         next();
//     }
// }

server.listen(8080, function() {
    console.log("I'm listening.");
});
