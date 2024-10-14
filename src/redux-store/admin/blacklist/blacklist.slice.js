import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFromBlackList,
  getBlackListedCustmers,
  updateFromBlackList,
  addToBlockList,
} from "api/requests";

const initialState = {
  list: [],
  isGetLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isDeleteLoading: false,
  isDeleteSucceeded: false,
  isAddLoading: false,
  isAddSucceeded: false,
};

export const getBlackList = createAsyncThunk(
  "blacklist/getAsync",
  getBlackListedCustmers
);

export const addToBlackList = createAsyncThunk(
  "blacklist/addAsync",
  addToBlockList
);

export const updateBlackList = createAsyncThunk(
  "blacklist/updateAsync",
  updateFromBlackList
);

export const deleteBlackList = createAsyncThunk(
  "blacklist/deleteAsync",
  deleteFromBlackList
);

export const blacklistSlice = createSlice({
  name: "blacklist/AsyncActions",
  initialState,
  extraReducers: {
    [getBlackList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getBlackList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload.users;
      state.countPage = payload.countPage;
    },
    [getBlackList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    [updateBlackList.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateBlackList.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateBlackList.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    [deleteBlackList.pending]: (state) => {
      state.isDeleteLoading = true;
      state.isDeleteSucceeded = false;
    },
    [deleteBlackList.fulfilled]: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = true;
    },
    [deleteBlackList.rejected]: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = false;
    },
    [addToBlackList.pending]: (state) => {
      state.isAddLoading = true;
      state.isAddSucceeded = false;
    },
    [addToBlackList.fulfilled]: (state) => {
      state.isAddLoading = false;
      state.isAddSucceeded = true;
    },
    [addToBlackList.rejected]: (state) => {
      state.isAddLoading = false;
      state.isAddSucceeded = false;
    },
  },
});

export default blacklistSlice.reducer;
