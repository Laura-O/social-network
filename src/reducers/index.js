import { combineReducers } from 'redux';
import FriendsReducer from './reducer_friends';
import FriendsRequestsReducer from './reducer_friend_requests';
import OnlineusersReducer from './reducer_online_users';

const rootReducer = combineReducers({
    friendRequests: FriendsRequestsReducer,
    friends: FriendsReducer,
    onlineUsers: OnlineusersReducer,
});

export default rootReducer;
