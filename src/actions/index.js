import axios from '../config/axios';

export function getFriendRequests() {
    console.log('in getfriendrequests actions');
    return axios.get('/getFriendrequests').then(results => {
        return {
            type: 'GET_FRIEND_REQUESTS',
            payload: results.data,
        };
    });
}

export function getFriends() {
    console.log('in get friends actions');
    return axios.get('/getFriends').then(results => {
        return {
            type: 'GET_FRIENDS',
            payload: results.data,
        };
    });
}

// export function getFriends() {
//     console.log('in actions');
//     return axios.get('/getFriendrequests').then(results => {
//         return {
//             type: 'GET_FRIENDS',
//             payload: results.data,
//         };
//     });
// }
