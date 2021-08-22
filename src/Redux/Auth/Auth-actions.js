import { createAction } from "@reduxjs/toolkit";

const registerRequest = createAction("auth/registerRequest");
const registerSuccess = createAction("auth/registerSuccess");

const LoginRequest = createAction("auth/LoginRequest");
const LoginSuccess = createAction("auth/LoginSuccess");

const mainMenuError = createAction("auth/mainMenuError");

const LogoutRequest = createAction("auth/LogoutRequest");
const LogoutSuccess = createAction("auth/LogoutSuccess");
const LogoutError = createAction("auth/LogoutError");

const getUserRequest = createAction("auth/getCurrentUserRequest");
const getUserSuccess = createAction("auth/getCurrentUserSuccess");
const getUserError = createAction("auth/getCurrentUserError");

const sendAvatarRequest = createAction("auth/sendAvatarRequest");
const sendAvatarSuccess = createAction("auth/sendAvatarSuccess");
const sendAvatarError = createAction("auth/sendAvatarError");

const getUsersRequest = createAction("auth/getUsersRequest");
const getUsersSuccess = createAction("auth/getUsersSuccess");
const getUsersError = createAction("auth/getUsersError");

export default {
  registerRequest,
  registerSuccess,
  LoginRequest,
  LoginSuccess,
  LogoutRequest,
  LogoutSuccess,
  LogoutError,
  getUserRequest,
  getUserSuccess,
  getUserError,
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
  sendAvatarRequest,
  sendAvatarSuccess,
  sendAvatarError,
  mainMenuError,
};
