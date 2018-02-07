const express = require('express');
const router = express.Router();
const knox = require('knox');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const fs = require('fs');

const db = require('../src/models/db.js');

let secrets;

if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('../secrets'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'peachan',
});

var diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/../uploads');
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

router.post('/files', uploader.single('file'), (req, res) => {
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

module.exports = router;
