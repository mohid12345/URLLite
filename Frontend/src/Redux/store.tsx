// store.js
import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web

// persistence config
const persistConfig = {
  key: "userStatus",
  storage,
};

// wrap your reducer
const persistedReducer = persistReducer(persistConfig, userAuthReducer);

const store = configureStore({
  reducer: {
    userStatus: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
// export type RootState = ReturnType<typeof store.getState>;

