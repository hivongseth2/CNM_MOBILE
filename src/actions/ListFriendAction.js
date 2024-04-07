import { FriendController, UserController } from '@/controllers';
import { strings } from '@/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FRIEND_ERROR: 'FRIEND_ERROR',
  FRIEND_SUCCESS: 'FRIEND_SUCCESS',
};

const friendsRequest = () => ({
  type: TYPES.FRIEND_REQUEST,
  payload: null,
});

const friendsSuccess = (listFriend) => ({
  type: TYPES.FRIEND_SUCCESS,
  payload: { listFriend },
});

const friendsError = (error) => ({
  type: TYPES.FRIEND_ERROR,
  payload: { error },
});

const clear = () => ({
  type: TYPES.CLEAR_STORE,
});

// action.js (hoặc tên file tương tự)

export const getAllFriend =
  () =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(friendsRequest());
      const friendController = new FriendController(networkService);
      await friendController.getAllFriend().then((res) => {
        if (res.status === 200) {
          dispatch(friendsSuccess(res.data));
        }
      });

      return data;
    } catch ({ data }) {
      dispatch(friendsError(data ?? strings.getFriends.error));
      return data;
    }
  };
export const deleteStore = () => {
  return async (dispatch, _, { networkService }) => {
    dispatch(clear());
  };
};
