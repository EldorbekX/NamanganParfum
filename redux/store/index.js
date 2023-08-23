import { configureStore } from "@reduxjs/toolkit";
import authReducer, { name as authName } from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [authName]: authReducer,
  },
});


