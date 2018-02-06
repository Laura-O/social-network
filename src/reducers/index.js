import { combineReducers } from 'redux';
import FriendsReducer from './reducer_friends';

const rootReducer = combineReducers({
    friends: FriendsReducer,
});

export default rootReducer;
