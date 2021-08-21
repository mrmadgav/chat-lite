import { createAction } from "@reduxjs/toolkit";

const registerRequest = createAction("auth/registerRequest");
const registerSuccess = createAction("auth/registerSuccess");
const registerError = createAction("auth/registerError");

const LoginRequest = createAction("auth/LoginRequest");
const LoginSuccess = createAction("auth/LoginSuccess");
const LoginError = createAction("auth/LoginError");

const LogoutRequest = createAction("auth/LogoutRequest");
const LogoutSuccess = createAction("auth/LogoutSuccess");
const LogoutError = createAction("auth/LogoutError");

const getCurrentUserRequest = createAction("auth/getCurrentUserRequest");
const getCurrentUserSuccess = createAction("auth/getCurrentUserSuccess");
const getCurrentUserError = createAction("auth/getCurrentUserError");

const getUserRequest = createAction("auth/getCurrentUserRequest");
const getUserSuccess = createAction("auth/getCurrentUserSuccess");
const getUserError = createAction("auth/getCurrentUserError");

const sendAvatarRequest = createAction("sendAvatarRequest");
const sendAvatarSuccess = createAction("sendAvatarSuccess");
const sendAvatarError = createAction("sendAvatarError");

const getUsersRequest = createAction("auth/getUsersRequest");
const getUsersSuccess = createAction("auth/getUsersSuccess");
const getUsersError = createAction("auth/getUsersError");

const sendImgRequest = createAction("sendImgRequest");
const sendImgSuccess = createAction("sendImgSuccess");
const sendImgError = createAction("sendImgError");

export default {
  registerRequest,
  registerSuccess,
  registerError,
  LoginRequest,
  LoginSuccess,
  LoginError,
  LogoutRequest,
  LogoutSuccess,
  LogoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  getUsersRequest,
  getUserSuccess,
  getUserError,
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
  sendAvatarRequest,
  sendAvatarSuccess,
  sendAvatarError,
  sendImgRequest,
  sendImgSuccess,
  sendImgError,
};
