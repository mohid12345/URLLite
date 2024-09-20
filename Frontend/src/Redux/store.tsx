import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";

const store = configureStore({
  reducer:{
    userStatus:userAuthSlice
  },
});

export default store