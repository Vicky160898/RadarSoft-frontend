import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("token") ? true : false,
};

export const IsAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkToken: (state) => {
      state.isAuth = localStorage.getItem("token") ? true : false;
    },
  },
});

export const { checkToken } = IsAuthSlice.actions;

export default IsAuthSlice.reducer;
