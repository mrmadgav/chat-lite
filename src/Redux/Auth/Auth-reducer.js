import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./Auth-actions";
import ChatActions from "../Chat/Chat-actions";

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
const filterValue = "";
const pickerValue = false;
const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => payload.data.user,
  [authActions.LoginSuccess]: (_, { payload }) => {
    console.log("Payload при логине", payload);
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
  // [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.LoginSuccess]: (_, { payload }) => payload.data.token,
  [authActions.LogoutSuccess]: () => null,
});
const error = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.LoginError]: (_, { payload }) => payload,
  [authActions.LogoutError]: (_, { payload }) => payload,
  [authActions.getUserError]: (_, { payload }) => payload,
  [ChatActions.sendMessageError]: (_, { payload }) => payload,
  [ChatActions.sendUserListError]: (_, { payload }) => payload.data,
  [ChatActions.fetchHistoryError]: (_, { payload }) => payload.data,
  [ChatActions.onFilterError]: (_, { payload }) => payload.data,
  [ChatActions.onPickerError]: (_, { payload }) => payload.data,
  [ChatActions.sendUpdatedMessageError]: (_, { payload }) => payload.data,
});
const chat = createReducer(messagesInChat, {
  [ChatActions.sendMessageSuccess]: (_, { payload }) => payload.data,
  [ChatActions.onDeleteSuccess]: (_, { payload }) => [payload.id],
});
const userChart = createReducer(userList, {
  [authActions.getUsersSuccess]: (_, { payload }) => {
    return [...userList, ...payload.data];
  },
});
const history = createReducer(allHistory, {
  [ChatActions.fetchHistorySuccess]: (_, { payload }) => payload.data.messages,
});
const filter = createReducer(filterValue, {
  [ChatActions.onFilterSuccess]: (_, { payload }) => payload,
});
const picker = createReducer(pickerValue, {
  [ChatActions.onPickerSuccess]: (_, { payload }) => payload,
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
});
