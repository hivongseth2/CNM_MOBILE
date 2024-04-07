export const getListMessenges = (state) => {
  return Object.keys(state.listMessenger).length > 0 ? state.listMessenger : null;
};
