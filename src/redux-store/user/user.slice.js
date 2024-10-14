import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfile, getUserProfile } from "api/requests";

const initialState = {
  data: null,
  token: null,
  statistics: {},
  isLoading: false,
  isUpdateLoading: false,
};

export const getUser = createAsyncThunk(
  "user/getUserDataAsync",
  getUserProfile
);

export const editUser = createAsyncThunk(
  "user/editUserDataAsync",
  editUserProfile
);

export const userProfileReducer = createSlice({
  name: "user/getUserData",
  initialState,
  reducers: {
    removeUserData(state, { payload }) {
      state.token = null;
      state.data = {};
      state.statistics = {};
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload?.user;
      state.token = payload?.user?._id;
    },
    [getUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [editUser.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
  },
});

export const { removeUserData } = userProfileReducer.actions;

export default userProfileReducer.reducer;
