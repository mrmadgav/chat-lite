export const getUser = (state) => state.authReducer.user.userId;
export const getMessages = (state) => state.authReducer.chat.messages;
export const getNickname = (state) => state.authReducer.user.nickname;
export const getAllUsers = (state) => state.authReducer.userChart;
export const getHistory = (state) => state.authReducer.history;
export const filterValue = (state) => state.authReducer.filter;
export const getAvatar = (state) => state.authReducer.user.avatarUrl;
export const deletedMessageID = (state) => state.authReducer.user.chat;
