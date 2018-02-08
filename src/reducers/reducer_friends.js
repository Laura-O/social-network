export default function(state = null, action) {
    switch (action.type) {
        case 'GET_FRIENDS':
            return action.payload;
        case 'CANCEL_FRIEND':
            return state.filter(friend => {
                return friend.id != action.id;
            });
        case 'ADD_FRIEND':
            return state.concat(action.friend);
    }
    return state;
}
