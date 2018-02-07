import * as io from 'socket.io-client';
import axios from './config/axios';
import { store } from './start';
import { addOnlineUsers, addNewOnlineUser, removeOnlineUser } from './actions';

let socket;

export default function getSocket() {
    if (!socket) {
        socket = io.connect();
        socket.on('connect', function() {
            console.log('in connect');
            axios.post(`/connect/${socket.id}`);
        });
        socket.on('onlineUsers', function(onlineUsers) {
            console.log('onlineUsers ', onlineUsers);
            store.dispatch(addOnlineUsers(onlineUsers));
        });
        socket.on('userJoined', function(newUser) {
            console.log('userJoined ', newUser);
            store.dispatch(addNewOnlineUser(newUser));
        });
        socket.on('userLeft', function(newUser) {
            console.log('userLeft ', newUser);
            store.dispatch(removeOnlineUser(newUser));
        });
    }
    return socket;
}
