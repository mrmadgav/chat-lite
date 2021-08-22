import { createAction } from "@reduxjs/toolkit";

const sendMessageRequest = createAction("chat/sendRequest");
const sendMessageSuccess = createAction("chat/sendSuccess");
const sendMessageError = createAction("chat/sendError");

const sendUserListRequest = createAction("chat/userListSendRequest");
const sendUserListSuccess = createAction("chat/userListSendSuccess");
const sendUserListError = createAction("chat/userListSendError");

// Общая хистори
const fetchHistoryRequest = createAction("chat/fetchHistoryRequest");
const fetchHistorySuccess = createAction("chat/fetchHistorySuccess");
const fetchHistoryError = createAction("chat/fetchHistoryError");

// Хистори в директ
const fetchPrivateHistoryRequest = createAction("chat/fetchPrivateHistoryRequest");
const fetchPrivateHistorySuccess = createAction("chat/fetchPrivateHistorySuccess");
const fetchPrivateHistoryError = createAction("chat/fetchPrivateHistoryError");

const onFilterRequest = createAction("chat/filterRequest");
const onFilterSuccess = createAction("chat/filterSuccess");
const onFilterError = createAction("chat/filterError");

const onPickerRequest = createAction("chat/onPickerRequest");
const onPickerSuccess = createAction("chat/onPickerSuccess");
const onPickerError = createAction("chat/onPickerError");

const onDeleteRequest = createAction("chat/onDeleteRequest");
const onDeleteSuccess = createAction("chat/onDeleteSuccess");
const onDeleteError = createAction("chat/onDeleteError");

const sendUpdatedMessageRequest = createAction("chat/onChangeRequest");
const sendUpdatedMessageSuccess = createAction("chat/onChangeSuccess");
const sendUpdatedMessageError = createAction("chat/onChangeError");

const setRoomIdRequest = createAction("chat/setRoomIdRequest");
const setRoomIdSuccess = createAction("chat/setRoomIdSuccess");
const setRoomIdError = createAction("chat/setRoomIdError");

const sendImgRequest = createAction("chat/sendImgRequest");
const sendImgSuccess = createAction("chat/sendImgSuccess");
const sendImgError = createAction("chat/sendImgError");

export default {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageError,
  sendUserListRequest,
  sendUserListSuccess,
  sendUserListError,
  fetchHistoryRequest,
  fetchHistorySuccess,
  fetchHistoryError,
  onFilterRequest,
  onFilterSuccess,
  onFilterError,
  onPickerRequest,
  onPickerSuccess,
  onPickerError,
  onDeleteRequest,
  onDeleteSuccess,
  onDeleteError,
  sendUpdatedMessageRequest,
  sendUpdatedMessageSuccess,
  sendUpdatedMessageError,
  fetchPrivateHistoryRequest,
  fetchPrivateHistorySuccess,
  fetchPrivateHistoryError,
  setRoomIdRequest,
  setRoomIdSuccess,
  setRoomIdError,
  sendImgRequest,
  sendImgSuccess,
  sendImgError,
};
