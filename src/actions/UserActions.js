import { UserController } from '@/controllers';
import { strings } from '@/localization';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  VERIFY_CODE: 'VERIFY_CODE',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const verifyError = (error) => ({
  type: TYPES.VERIFY_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

const registerRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

// action.js (hoặc tên file tương tự)
export const registerError = (error) => ({
  type: 'REGISTER_ERROR',
  payload: error,
});
export const login =
  (email, password) =>
  async (dispatch, _, { networkService }) => {
    try {
      dispatch(loginRequest());
      const userController = new UserController(networkService);
      const { data } = await userController.login({ email, password });

      networkService.setAccessToken(data.token);

      dispatch(loginSuccess(data.user));
      return data;
    } catch ({ data }) {
      console.log('erroro', data);
      dispatch(loginError(data ?? strings.login.invalidCredentials));
      return data;
    }
  };

export const register =
  (fullName, phone, dateOfBirth, email, password) =>
  async (dispatch, _, { networkService }) => {
    try {
      // Khởi tạo userController với networkService
      const userController = new UserController(networkService);

      // Gửi yêu cầu đăng ký với các thông tin đã cung cấp và đợi cho kết quả
      const { data } = await userController.register({
        fullName,
        phone,
        dateOfBirth,
        email,
        password,
      });

      return data;
    } catch (error) {
      dispatch(registerError(error?.data ?? strings.register.invalidCredentials));
      return error.data;
    }
  };

export const verifyCode =
  (email, verificationCode) =>
  async (dispatch, _, { networkService }) => {
    try {
      // dispatch();
      const userController = new UserController(networkService);
      const { data } = await userController.veritifi({
        email,
        verificationCode,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.data);
      // dispatch(verifyError(error?.error ?? strings.error.invalidCredentials));
      return error.data;
    }
  };

export const GenCode =
  (email, verificationCode) =>
  async (dispatch, _, { networkService }) => {
    try {
      const userController = new UserController(networkService);
      const { data } = await userController.GenCode({
        email,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      console.error('Error:', error);
      dispatch(registerError(error?.response?.data?.error ?? strings.register.invalidCredentials));
      return error.data;
    }
  };

export const logout =
  () =>
  async (dispatch, _, { demoMode, networkService }) => {
    try {
      const userController = new UserController(networkService);
      await userController.logout({ demoMode });
    } finally {
      networkService.clearAccessToken();
      dispatch(clearStore());
    }
  };
