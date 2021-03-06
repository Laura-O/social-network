const friendship = require('../models/friendship.js');
const messages = require('../models/messages.js');

module.exports = function(app, io) {
    let onlineUsers = [];
    let chatMessages = [];

    io.on('connection', function(socket) {
        socket.on('disconnect', function() {
            const socketToRemove = onlineUsers.filter(user => user.socketId === socket.id)[0];
            onlineUsers.splice(onlineUsers.indexOf(socketToRemove), 1);

            const userSockets = onlineUsers.filter(user => user.userId === socketToRemove.userId);

            if (userSockets.length === 0) {
                io.sockets.emit('userLeft', { userId: socketToRemove.userId });
            }
        });

        socket.on('chatMessage', function(message) {
            const messageSender = onlineUsers.filter(user => user.socketId === socket.id)[0];

            friendship.getUserById(messageSender.userId).then(user => {
                messages.addMessage(user.id, message).then(id => {
                    io.sockets.emit('chatMessage', { message_id: id, user, message });

                    chatMessages.push({
                        message_id: id,
                        user,
                        message,
                    });
                });
            });
        });
    });

    app.post('/connect/:socketId', function(req, res) {
        const socketId = req.params.socketId;
        const userId = req.session.user.id;

        const onlineIds = onlineUsers.map(user => user.userId);

        onlineUsers.push({
            userId,
            socketId,
        });

        friendship
            .getUsersById(onlineIds)
            .then(users => {
                io.sockets.sockets[socketId].emit('onlineUsers', users);
                io.sockets.sockets[socketId].emit('chatMessages', chatMessages);
                res.json(users);
            })
            .catch(err => console.log(err));

        const userSockets = onlineUsers.filter(user => user.userId == userId);

        if (userSockets.length == 1) {
            friendship.getUserById(userId).then(user => io.sockets.emit('userJoined', user));
        }
    });
};
