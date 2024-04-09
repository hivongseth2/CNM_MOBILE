import { TYPES } from '@/actions/FriendRequestAction';

export const friendRequestReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.FRIENDRQ_SUCCESS:
      return payload.listFriend;
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
