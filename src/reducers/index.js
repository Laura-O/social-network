import { combineReducers } from 'redux';
import FriendsReducer from './reducer_friends';
import FriendsRequestsReducer from './reducer_friend_requests';
import OnlineusersReducer from './reducer_online_users';
import UserReducer from './reducer_user.js';
import ChatMessageReducer from './reducer_messages';

const rootReducer = combineReducers({
    chatmessages: ChatMessageReducer,
    friendRequests: FriendsRequestsReducer,
    friends: FriendsReducer,
    onlineUsers: OnlineusersReducer,
    user: UserReducer,
});

export default rootReducer;
