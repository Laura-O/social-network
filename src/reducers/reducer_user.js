export default function(state = {}, action) {
    switch (action.type) {
        case 'ADD_CURRENT_USER':
            return action.user;
        case 'CHANGE_BIO':
            return {
                ...state,
                bio: action.bio,
            };
        case 'CHANGE_PROFILE_PIC':
            return {
                ...state,
                profilepicurl: action.profilepic,
            };
    }
    return state;
}
