export default function(state = null, action) {
    console.log('reducer', action.type);
    switch (action.type) {
                    case 'GET_FRIEND_REQUESTS':
                        return action.payload;
    }
    return state;
}
