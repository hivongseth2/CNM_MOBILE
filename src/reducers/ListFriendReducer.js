import { TYPES } from '@/actions/ListFriendAction';

export const listFriendReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.FRIEND_SUCCESS:
      console.log('payload123', payload);

      return payload.listFriend;
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
