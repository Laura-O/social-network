export default function(state = null, action) {
    console.log(action, state);
    switch (action.type) {
        case 'ONLINE_USERS':
            return action.onlineUsers;
    }
    return state;
}
