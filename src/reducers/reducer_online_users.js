export default function(state = [], action) {
    console.log(action, state);
    switch (action.type) {
        case 'ONLINE_USERS':
            return action.onlineUsers;
        case 'ADD_ONLINE_USER':
            return state.concat(action.user);
        case 'REMOVE_ONLINE_USER':
            return state.filter(user => {
                return user.id != action.user.userId;
            });
    }
    return state;
}
