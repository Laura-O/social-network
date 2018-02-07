const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./src/models/db.js');
const password = require('./src/models/password.js');
const user = require('./src/models/user.js');
const friendship = require('./src/models/friendship.js');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const fs = require('fs');
const knox = require('knox');
const csurf = require('csurf');

const profileRoutes = require('./routes/profile.js');
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');

let secrets;

if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'peachan',
});

var diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/uploads');
    },
    filename: (req, file, callback) => {
        uidSafe(24).then(uid => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

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

app.post('/files', uploader.single('file'), (req, res) => {
    if (req.file) {
        const s3Request = client.put(req.file.filename, {
            'Content-Type': req.file.mimetype,
            'Content-Length': req.file.size,
            'x-amz-acl': 'public-read',
        });
        const readStream = fs.createReadStream(req.file.path);
        readStream.pipe(s3Request);

        s3Request.on('response', s3Response => {
            const wasSuccessful = s3Response.statusCode == 200;
            const query = 'UPDATE users SET profilepicurl = $1 WHERE id = $2';
            const fileName = 'https://s3.amazonaws.com/peachan/' + req.file.filename;
            db
                .query(query, [fileName, req.session.user.id])
                .then(() => {
                    req.session.user.profilepicurl = fileName;
                    res.json({
                        success: true,
                        profilepic: fileName,
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ success: false });
                });
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get('*', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

// midleware
function requireUser(req, res, next) {
    if (!req.session.user) {
        res.sendStatus(403);
    } else {
        next();
    }
}

app.listen(8080, function() {
    console.log("I'm listening.");
});
