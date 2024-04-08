import { FriendController, MessengerController, UserController } from '@/controllers';
import { strings } from '@/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  MESSENGES_REQUEST: 'MESSENGES_REQUEST',
  MESSENGES_ERROR: 'MESSENGES_ERROR',
  MESSENGES_SUCCESS: 'MESSENGES_SUCCESS',

  SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
};

const messengesRequest = () => ({
  type: TYPES.MESSENGES_REQUEST,
  payload: null,
});

const messengesSuccess = (listMess) => ({
  type: TYPES.MESSENGES_SUCCESS,
  payload: { listMess },
});

const messengesError = (error) => ({
  type: TYPES.MESSENGES_ERROR,
  payload: { error },
});

const sendMessageRequest = () => ({
  type: TYPES.SEND_MESSAGE_REQUEST,
  payload: null,
});

const sendMessageSuccess = (message) => ({
  type: TYPES.SEND_MESSAGE_SUCCESS,
  payload: { message },
});

const sendMessageError = (error) => ({
  type: TYPES.SEND_MESSAGE_ERROR,
  payload: { error },
});

const clear = () => ({
  type: TYPES.CLEAR_STORE,
});

// action.js (hoặc tên file tương tự)

export const getAllMessenger =
  () =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(messengesRequest());
      const messengerController = new MessengerController(networkService);
      const data = await messengerController.getAllMessenger().then((res) => {
        if (res.status === 200) {
          dispatch(messengesSuccess(res.data));
        }
      });

      return data;
    } catch ({ data }) {
      dispatch(messengesError(data ?? strings.messenger.error));
      return data;
    }
  };

export const sendMessageAction =
  ({ receiverId, content }) =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(sendMessageRequest());
      const messengerController = new MessengerController(networkService);
      await messengerController.sendMessage({ receiverId, content }).then((res) => {
        if (res.status === 200) {
          dispatch(sendMessageSuccess(res.data));
        }
      });
    } catch ({ data }) {
      dispatch(sendMessageError(data ?? strings.sendMessage.error));
      return data;
    }
  };
export const deleteStore = () => {
  return async (dispatch, _, { networkService }) => {
    dispatch(clear());
  };
};
