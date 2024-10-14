import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePaymentStatus, getCommentsList } from "api/requests";

const initialState = {
  list: [],
  pageCount: 0,
  isGetLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isFilterLoading: false,
};

export const getCommentList = createAsyncThunk(
  "comments/getAsync",
  getCommentsList
);

export const updateComment = createAsyncThunk(
  "comments/updateAsync",
  getCommentsList
);

export const adminCommentsSlice = createSlice({
  name: "AdminComments/AsyncActions",
  initialState,
  extraReducers: {
    [getCommentList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getCommentList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload?.comments;
      state.pageCount = payload?.countPage;
    },
    [getCommentList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    [updateComment.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateComment.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateComment.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
  },
});

export default adminCommentsSlice.reducer;
