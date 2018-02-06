import axios from '../config/axios';

export function getFriends() {
    console.log('in actions');
    return axios.get('/getFriends').then(results => {
        return {
            type: 'GET_FRIENDS',
            payload: results.data,
        };
    });
}
