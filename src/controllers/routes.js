const url = 'http://103.71.96.70:8080';
//const url = 'https://763a-2401-d800-ab1-57e3-90fa-4035-adbe-c77f.ngrok-free.app';
// const url = 'https://7f65-2405-4802-8137-e5a0-b46f-cba1-71f8-2e0b.ngrok-free.app';
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
    friendRequest: `${url}/user/friend/request`,
  },
  message: {
    getAllMessenger: `${url}/message`,
    sendMessage: `${url}/message/send-text`,
    sendFile: `${url}/message/send-file`,
  },

  // register: {
  //   register: '/users/register',
  // },
};
