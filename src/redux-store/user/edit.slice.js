import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfile } from "api/requests";

const initialState = {
  data: {},
  token: null,
  statistics: {},
  isLoading: false,
};

export const editUser = createAsyncThunk(
  "user/editUserDataAsync",
  editUserProfile
);

export const userProfileReducer = createSlice({
  name: "user/editUserData",
  initialState,
  extraReducers: {
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [editUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userProfileReducer.reducer;
