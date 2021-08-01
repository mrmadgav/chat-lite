export const getIsAuthenticated = (state) => !!state.authReducer.token;
export const getUserName = (state) => state.authReducer.user.name;
export const getToken = (state) => state.authReducer.token;
