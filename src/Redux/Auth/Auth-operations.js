import authActions from "../Auth/Auth-actions";
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

export const register = (credentials) => async (dispatch) => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post("/registration", credentials);
    dispatch(authActions.registerSuccess(response.data));
    dispatch(login(credentials));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(authActions.LoginRequest());
  try {
    await axios
      .post("/login", credentials)
      .then((response) => {
        token.set(response.data.data.token);
        dispatch(authActions.LoginSuccess(response.data));
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
          dispatch(authActions.LoginError(e.response.data.message));
        }
      });
  } catch (error) {
    console.log(error);
  }
};

// export const login = (credentials) => async (dispatch) => {
//   dispatch(authActions.LoginRequest());
//   const response = await axios
//     .post("/login", credentials)
//     .catch((e) => console.log(e));
//   token.set(response.data.data.token);
//   dispatch(authActions.LoginSuccess(response.data));
// };

// export const login = (credentials) => (dispatch) => {
//   dispatch(authActions.LoginRequest());

//   new Promise((resolve, reject) => {
//     const response = axios.post("/login", credentials);
//     console.log(response);
//     resolve(token.set(response.data.data.token));
//   })
//     .then((response) => {
//       console.log(response);
//       dispatch(authActions.LoginSuccess(response.data));
//     })
//     .catch((response) => console.log(response.message));
// };

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

export const getUsers = (currentToken) => async (dispatch) => {
  dispatch(authActions.getUsersRequest());
  try {
    const users = await axios.get("/users", {
      headers: { Authorization: "Bearer " + currentToken },
    });
    dispatch(authActions.getUsersSuccess(users.data));
  } catch (error) {
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

export const sendImg = (data, currentToken, roomId) => async (dispatch) => {
  dispatch(authActions.sendImgRequest());
  try {
    let formData = new FormData();
    formData.append("img", data);
    const response = await axios.post(`/img?roomId=${roomId}`, formData, {
      headers: { Authorization: "Bearer " + currentToken },
    });
    return dispatch(authActions.sendImgSuccess(response.data));
  } catch (error) {
    dispatch(authActions.sendImgError(error.message));
  }
};
