import axios from '../config/axios';

export function getFriendRequests() {
    return axios.get('/getFriendrequests').then(results => {
        return {
            type: 'GET_FRIEND_REQUESTS',
            payload: results.data,
        };
    });
}

export function getFriends() {
    return axios.get('/getFriends').then(results => {
        return {
            type: 'GET_FRIENDS',
            payload: results.data,
        };
    });
}

export function cancelFriendship(id) {
    return axios.post('/cancelFriendship', { friend_id: id }).then(() => {
        return {
            type: 'CANCEL_FRIEND',
            id,
        };
    });
}

export function approveRequest(id) {
    return axios.post('/approveRequest', { friend_id: id }).then(() => {
        return {
            type: 'APPROVE_REQUEST',
            id,
        };
    });
}

export function addFriend(friend) {
    return {
        type: 'ADD_FRIEND',
        friend,
    };
}

export function addOnlineUsers(onlineUsers) {
    return {
        type: 'ONLINE_USERS',
        onlineUsers,
    };
}

export function addNewOnlineUser(user) {
    return {
        type: 'ADD_ONLINE_USER',
        user,
    };
}

export function removeOnlineUser(user) {
    return {
        type: 'REMOVE_ONLINE_USER',
        user,
    };
}

export function addCurrentUser(user) {
    return {
        type: 'ADD_CURRENT_USER',
        user,
    };
}

export function changeBio(bio) {
    return {
        type: 'CHANGE_BIO',
        bio,
    };
}

export function changeProfilePic(profilepic) {
    return {
        type: 'CHANGE_PROFILE_PIC',
        profilepic,
    };
}

export function addSingleChatMessage(message) {
    return {
        type: 'ADD_CHAT_MESSAGE',
        message,
    };
}

export function addChatMessages(messages) {
    return {
        type: 'ADD_CHAT_MESSAGES',
        messages,
    };
}
