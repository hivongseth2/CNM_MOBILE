import { FriendController, UserController } from '@/controllers';
import { strings } from '@/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_ERROR: 'SEARCH_ERROR',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',

  SEND_FRIEND_REQUEST: 'SEND_FRIEND_REQUEST',
  SEND_FRIEND_SUCCESS: 'SEND_FRIEND_SUCCESS',
  SEND_FRIEND_ERROR: 'SEND_FRIEND_ERROR',

  ACCEPT_FRIEND_REQUEST: 'ACCEPT_FRIEND_REQUEST',
  ACCEPT_FRIEND_SUCCESS: 'ACCEPT_FRIEND_SUCCESS',
  ACCEPT_FRIEND_ERROR: 'ACCEPT_FRIEND_ERROR',

  DELETE_FRIEND_REQUEST: 'DELETE_FRIEND_REQUEST',
  DELETE_FRIEND_SUCCESS: 'DELETE_FRIEND_SUCCESS',
  DELETE_FRIEND_ERROR: 'SEND_FRIEND_ERROR',
};




const searchRequest = () => ({
  type: TYPES.SEARCH_REQUEST,
  payload: null,
});

const searchSuccess = (user) => ({
  type: TYPES.SEARCH_SUCCESS,
  payload: { user },
});

const searchError = (error) => ({
  type: TYPES.SEARCH_ERROR,
  payload: { error },
});

const clear = () => ({
  type: TYPES.CLEAR_STORE,
});

// action.js (hoặc tên file tương tự)

export const SearchByEmail =
  (email) =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(searchRequest());
      const friendController = new FriendController(networkService);
      await friendController.searchEmail({ email }).then((res) => {
        if (res.status === 200) {
          dispatch(searchSuccess(res.data));
        }
      });
      return data;
    } catch ({ data }) {
      dispatch(searchError(data ?? strings.searchFriend.error));
      return data;
    }
  };
export const deleteStore = () => {
  return async (dispatch, _, { networkService }) => {
    // Thêm từ khóa return ở đây
    dispatch(clear());
  };
};
