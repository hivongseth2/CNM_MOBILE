const url = 'http://103.71.96.70:8080';
//const url = 'https://763a-2401-d800-ab1-57e3-90fa-4035-adbe-c77f.ngrok-free.app';
// const url = 'http://localhost:8082';
export const routes = {
  authentication: {
    login: `${url}/auth/login`,
    logout: '/users/logout',

    register: `${url}/auth/register`,
    veritifi: `${url}/auth/verify-account`,

    gencode: `${url}/auth/generate-verification-code/`,
  },

  friend: {
    getFriend: `${url}/friend/get-friend/`,
    addFriend: `${url}/friend/add-friend/`,
    removeFriend: `${url}/friend/remove-friend/`,
    searchByEmail: `${url}/user/friend/find/`,
    getAllFriend: `${url}/user/friend`,
  },
  message: {
    getAllMessenger: `${url}/message`,
    sendMessage: `${url}/message/send-text`,
  },

  // register: {
  //   register: '/users/register',
  // },
};
