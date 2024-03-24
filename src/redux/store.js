import { configureStore } from "@reduxjs/toolkit";
import IsAuthReducer from "./Reducers/isAuthSlice";

export const store = configureStore({
  reducer: {
    auth: IsAuthReducer,
  },
});
