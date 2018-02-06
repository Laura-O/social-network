import { combineReducers } from 'redux';
import FriendsReducer from './reducer_friends';
import FriendsRequestsReducer from './reducer_friend_requests';

const rootReducer = combineReducers({
    friendRequests: FriendsRequestsReducer,
    friends: FriendsReducer,
});

export default rootReducer;
