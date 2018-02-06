export default function(state = null, action) {
    console.log('reducer', action.type);
    switch (action.type) {
                    case 'GET_FRIENDS':
                        return action.payload;
    }
    return state;
}
