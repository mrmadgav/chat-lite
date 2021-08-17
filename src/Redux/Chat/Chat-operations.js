import chatActions from "./Chat-actions.js";
import axios from "axios";

axios.defaults.baseURL = "https://chat-lite-back.herokuapp.com";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const sendMessage = (credentials, currentToken) => async (dispatch) => {
  dispatch(chatActions.sendMessageRequest());
  try {
    const response = await axios.post("/user/messages/send", credentials, {
      headers: { Authorization: "Bearer " + currentToken },
    });

    dispatch(chatActions.sendMessageSuccess(response.data));
    !credentials.roomId
      ? dispatch(fetchHistory())
      : dispatch(fetchPrivateHistory());
  } catch (error) {
    dispatch(chatActions.sendMessageError(error.message));
  }
};

export const sendUserList = (data) => async (dispatch) => {
  dispatch(chatActions.sendUserListRequest());
  try {
    dispatch(chatActions.sendUserListSuccess(data));
  } catch (error) {
    dispatch(chatActions.sendUserListError(error.message));
  }
};

export const fetchHistory = () => async (dispatch) => {
  dispatch(chatActions.fetchHistoryRequest());
  try {
    const response = await axios.get("/messages/");

    dispatch(chatActions.fetchHistorySuccess(response.data));
  } catch (error) {
    dispatch(chatActions.fetchHistoryError(error.message));
  }
};

export const fetchPrivateHistory = (credentials) => async (dispatch) => {
  dispatch(chatActions.fetchPrivateHistoryRequest());
  try {
    const response = await axios.get("/privateHistory", {
      params: { roomId: credentials },
    });
    console.log(response);
    dispatch(chatActions.fetchPrivateHistorySuccess(response.data));
  } catch (error) {
    dispatch(chatActions.fetchPrivateHistoryError(error.message));
  }
};

export const onFilter = (data) => async (dispatch) => {
  dispatch(chatActions.onFilterRequest());
  try {
    dispatch(chatActions.onFilterSuccess(data));
  } catch (error) {
    dispatch(chatActions.onFilterError(error.message));
  }
};

export const onPicker = (data) => async (dispatch) => {
  dispatch(chatActions.onPickerRequest());
  try {
    dispatch(chatActions.onPickerSuccess(data));
  } catch (error) {
    dispatch(chatActions.onPickerError(error.message));
  }
};

export const onDelete = (data) => async (dispatch) => {
  dispatch(chatActions.onDeleteRequest());
  try {
    await axios.post("/message/delete", data);
    dispatch(chatActions.onDeleteSuccess(data));
    dispatch(fetchHistory());
  } catch (error) {
    dispatch(chatActions.onDeleteError(error.message));
  }
};

export const sendUpdatedMessage = (data) => async (dispatch) => {
  dispatch(chatActions.sendUpdatedMessageRequest());
  try {
    await axios.post("/message/update", data);
    dispatch(chatActions.sendUpdatedMessageSuccess(data));
    dispatch(fetchHistory());
  } catch (error) {
    dispatch(chatActions.sendUpdatedMessageError(error.message));
  }
};
