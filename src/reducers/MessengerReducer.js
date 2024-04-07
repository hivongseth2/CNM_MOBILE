import { TYPES } from '@/actions/MessengerAction';

export const listMessReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.MESSENGES_SUCCESS:
      return payload.listMess;
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
