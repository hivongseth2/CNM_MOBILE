import { combineReducers } from 'redux';
import { errorReducer } from '@/reducers/ErrorReducer';
import { statusReducer } from '@/reducers/StatusReducer';
import { userReducer } from '@/reducers/UserReducer';
import { friendReducer } from './FriendReducer';
import { listFriendReducer } from './ListFriendReducer';
import { listMessReducer } from './MessengerReducer';
import { friendRequestReducer } from './FriendRequestReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  friend: friendReducer,
  listFriend: listFriendReducer,
  listMessenger: listMessReducer,
  listFriendRequest: friendRequestReducer,
});
