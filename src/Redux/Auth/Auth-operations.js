import authActions from "../Auth/Auth-actions";
import axios from "axios";
import { useHistory } from "react-router-dom";
axios.defaults.baseURL = "https://chat-lite-back.herokuapp.com";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = (credentials) => async (dispatch) => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post("/registration", credentials);
    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
    const history = useHistory();
    history.push("/login");
    // this.props.history.push("/login");
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(authActions.LoginRequest());
  dispatch(authActions.getUsersRequest());

  try {
    const response = await axios.post("/login", credentials);
    token.set(response.data.data.token);
    dispatch(authActions.LoginSuccess(response.data));

    const users = await axios.get("/users");
    dispatch(authActions.getUsersSuccess(users.data));
  } catch (error) {
    dispatch(authActions.LoginError(error.message));
    dispatch(authActions.getUsersError(error.message));
  }
};

export const logout = (id, currentToken) => async (dispatch) => {
  dispatch(authActions.LogoutRequest());

  try {
    token.set(currentToken);
    await axios.post("/logout", { id: id });

    token.unset();
    dispatch(authActions.LogoutSuccess());
  } catch (error) {
    dispatch(authActions.LogoutError(error.message));
  }
};

// export const getCurrentUser = () => async (dispatch, getState) => {
//   const {
//     authReducer: { token: persistedToken },
//   } = getState();

//   if (!persistedToken) {
//     return;
//   }
//   token.set(persistedToken);

//   dispatch(authActions.getCurrentUserRequest());
//   try {
//     const response = await axios.get("/users/current");
//     dispatch(authActions.getCurrentUserSuccess(response.data));
//   } catch (error) {
//     dispatch(authActions.getCurrentUserError(error.message));
//   }
// };

export const getUser = (currentToken) => async (dispatch) => {
  dispatch(authActions.getUserRequest());
  try {
    const response = await axios.get("/users/current", {
      headers: { Authorization: "Bearer " + currentToken },
    });
    dispatch(authActions.getUserSuccess(response.data.data));

    const users = await axios.get("/users", {
      headers: { Authorization: "Bearer " + currentToken },
    });
    dispatch(authActions.getUsersSuccess(users.data));
  } catch (error) {
    dispatch(authActions.getUserError(error.message));
    dispatch(authActions.getUsersError(error.message));
  }
};

export const sendAvatar = (data, currentToken) => async (dispatch) => {
  dispatch(authActions.sendAvatarRequest());
  try {
    let formData = new FormData();
    formData.append("avatar", data);
    const response = await axios.patch("/avatars", formData, {
      headers: { Authorization: "Bearer " + currentToken },
    });

    return dispatch(authActions.sendAvatarSuccess(response.data));
  } catch (error) {
    dispatch(authActions.sendAvatarError(error.message));
  }
};
