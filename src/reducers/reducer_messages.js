export default function(state = [], action) {
    console.log(state, action);
    switch (action.type) {
                    case 'ADD_CHAT_MESSAGES':
                        return action.messages;
                    case 'ADD_CHAT_MESSAGE':
                        return [...state, action.message];
    }
    return state;
}
