export const getFriend = (state) => {
  return Object.keys(state.friend).length > 0 ? state.friend : null;
};
export const getListFriend = (state) => {
  return Object.keys(state.listFriend).length > 0 ? state.listFriend : null;
};
