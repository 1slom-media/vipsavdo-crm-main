import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: undefined,
  text: "",
  title: "",
};

export const alertSlice = createSlice({
  name: "alertByStatus",
  initialState,
  reducers: {
    pushAlert: (state, { payload }) => {
      state.type = payload.type;
      state.text = payload.text;
      state.title = payload.title;
    },
    clearAlert: (state, {}) => {
      state.title = "";
      state.text = "";
      state.type = undefined;
    },
  },
});

export const { clearAlert, pushAlert } = alertSlice.actions;

export default alertSlice.reducer;
