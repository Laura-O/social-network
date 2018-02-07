function requireUser(req, res, next) {
    if (!req.session.user) {
        res.sendStatus(403);
    } else {
        next();
    }
}

module.exports = {
    requireUser,
};
