import { FriendController, UserController } from '@/controllers';
import { strings } from '@/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  FRIENDRQ_REQUEST: 'FRIENDRQ_REQUEST',
  FRIENDRQ_ERROR: 'FRIENDRQ_ERROR',
  FRIENDRQ_SUCCESS: 'FRIENDRQ_SUCCESS',
};

const friendsRqRequest = () => ({
  type: TYPES.FRIENDRQ_REQUEST,
  payload: null,
});

const friendsRqSuccess = (listFriend) => ({
  type: TYPES.FRIENDRQ_SUCCESS,
  payload: { listFriend },
});

const friendsRqError = (error) => ({
  type: TYPES.FRIENDRQ_ERROR,
  payload: { error },
});

const clear = () => ({
  type: TYPES.CLEAR_STORE,
});

// action.js (hoặc tên file tương tự)

export const getAllFriendRequestAction =
  () =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(friendsRqRequest());
      const friendController = new FriendController(networkService);
      await friendController.getAllFriendRequest().then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(friendsRqSuccess(res.data));
        }
      });

      return data;
    } catch ({ data }) {
      dispatch(friendsRqError(data ?? strings.getFriends.error));
      return data;
    }
  };
export const deleteStore = () => {
  return async (dispatch, _, { networkService }) => {
    dispatch(clear());
  };
};
