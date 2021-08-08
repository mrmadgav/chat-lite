import authReducer from "../Redux/Auth/Auth-reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  console.groupEnd(action.type);
  return next(action);
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  loggerMiddleware,
];

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    authReducer: persistReducer(authPersistConfig, authReducer),
  },
  middleware,
});
const persistor = persistStore(store);
export default { store, persistor };
