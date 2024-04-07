import { TYPES } from '@/actions/FriendAction';

export const friendReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.SEARCH_SUCCESS:
      return { payload };
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
