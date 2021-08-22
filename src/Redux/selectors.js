export const getToken = (state) => state.Reducer.token;
export const getIsAuthenticated = (state) => !!state.Reducer.token;

export const getUserId = (state) => state.Reducer.user.userId;
export const getNickname = (state) => state.Reducer.user.nickname;
export const deletedMessageID = (state) => state.Reducer.user.chat;
export const getAvatar = (state) => state.Reducer.user.avatarUrl;

export const getMessages = (state) => state.Reducer.chat.messages;
export const getAllUsers = (state) => state.Reducer.userChart;
export const getHistory = (state) => state.Reducer.history;
export const filterValue = (state) => state.Reducer.filter;
export const getPrivateHistory = (state) => state.Reducer.privateHistory;
export const getRoomId = (state) => state.Reducer.roomId;
export const getError = (state) => state.Reducer.error;
