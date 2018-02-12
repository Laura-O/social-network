import * as io from 'socket.io-client';
import axios from './config/axios';
import { store } from './start';
import {
    addOnlineUsers,
    addNewOnlineUser,
    removeOnlineUser,
    addChatMessages,
    addSingleChatMessage,
} from './actions';

let socket;

export default function getSocket() {
    if (!socket) {
        socket = io.connect();
        socket.on('connect', function() {
            axios.post(`/connect/${socket.id}`);
        });
        socket.on('onlineUsers', function(onlineUsers) {
            store.dispatch(addOnlineUsers(onlineUsers));
        });
        socket.on('userJoined', function(newUser) {
            store.dispatch(addNewOnlineUser(newUser));
        });
        socket.on('userLeft', function(newUser) {
            store.dispatch(removeOnlineUser(newUser));
        });
        socket.on('chatMessage', function(message) {
            store.dispatch(addSingleChatMessage(message));
        });
    }
    return socket;
}
