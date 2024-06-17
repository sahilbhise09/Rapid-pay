import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./usersSlice";
import loadersSlice from "./loadersSlice";

const store = configureStore({
  reducer: {
    users: usersReducers,
    loaders: loadersSlice,
  },
});

export default store;
