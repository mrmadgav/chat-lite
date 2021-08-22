import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./Auth/Auth-actions";
import chatActions from "./Chat/Chat-actions";

const initialUserState = {
  user: null,
  email: null,
  userId: null,
  nickname: null,
  avatarUrl: null,
};
const messagesInChat = { messages: [] };
const userList = [];
const allHistory = [];
const twoUsersHistory = [];
const filterValue = "";
const pickerValue = false;
const privateRoomId = "";

const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => payload.data.user,
  [authActions.LoginSuccess]: (_, { payload }) => {
    return {
      ..._,
      userId: payload.id,
      nickname: payload.nickname,
    };
  },
  [authActions.LogoutSuccess]: () => initialUserState,
  [authActions.getUserSuccess]: (_, { payload }) => {
    return {
      ..._,
      userId: payload._id,
      nickname: payload.nickname,
      avatarUrl: payload.urlAvatar,
    };
  },
});
const token = createReducer(null, {
  [authActions.LoginSuccess]: (_, { payload }) => payload.data.token,
  [authActions.LogoutSuccess]: () => null,
});
const error = createReducer(null, {
  [authActions.mainMenuError]: (_, { payload }) => payload,  
  [authActions.LogoutError]: (_, { payload }) => payload,
  [authActions.getUserError]: (_, { payload }) => payload,
  [chatActions.sendMessageError]: (_, { payload }) => payload,
  [chatActions.sendUserListError]: (_, { payload }) => payload.data,
  [chatActions.fetchHistoryError]: (_, { payload }) => payload.data,
  [chatActions.onFilterError]: (_, { payload }) => payload.data,
  [chatActions.onPickerError]: (_, { payload }) => payload.data,
  [chatActions.sendUpdatedMessageError]: (_, { payload }) => payload.data,
  [chatActions.fetchPrivateHistoryError]: (_, { payload }) => payload.data,
});
const chat = createReducer(messagesInChat, {
  [chatActions.sendMessageSuccess]: (_, { payload }) => payload.data,
  [chatActions.onDeleteSuccess]: (_, { payload }) => [payload.id],
});
const userChart = createReducer(userList, {
  [authActions.getUsersSuccess]: (_, { payload }) => {
    return [...userList, ...payload.data];
  },
});
const history = createReducer(allHistory, {
  [chatActions.fetchHistorySuccess]: (_, { payload }) => payload.data.messages,
});
const filter = createReducer(filterValue, {
  [chatActions.onFilterSuccess]: (_, { payload }) => payload,
});
const picker = createReducer(pickerValue, {
  [chatActions.onPickerSuccess]: (_, { payload }) => payload,
});
const privateHistory = createReducer(twoUsersHistory, {
  [chatActions.fetchPrivateHistorySuccess]: (_, { payload }) => {
    return payload.data.messages;
  },
});
const roomId = createReducer(privateRoomId, {
  [chatActions.setRoomIdSuccess]: (_, { payload }) => payload,
});

export default combineReducers({
  user,
  token,
  error,
  chat,
  userChart,
  history,
  filter,
  picker,
  privateHistory,
  roomId,
});
