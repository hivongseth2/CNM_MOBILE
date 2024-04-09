export const getFriend = (state) => {
  return Object.keys(state.friend).length > 0 ? state.friend : null;
};
export const getListFriend = (state) => {
  return Object.keys(state.listFriend).length > 0 ? state.listFriend : null;
};
export const getListFriendRequest = (state) => {
  return Object.keys(state.listFriendRequest).length > 0 ? state.listFriendRequest : null;
};
