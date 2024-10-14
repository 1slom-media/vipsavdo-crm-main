import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePaymentStatus, getAdminPaymentsList } from "api/requests";

const initialState = {
  list: [],
  pageCount: 0,
  isGetLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isFilterLoading: false,

  searchList: [],
  isSearchLoading: false,
};

export const getPaymentsList = createAsyncThunk(
  "payments/getAsync",
  getAdminPaymentsList
);

export const searchPaymentList = createAsyncThunk(
  "payments/searchPaymentList",
  getAdminPaymentsList
);

export const updatePayment = createAsyncThunk(
  "payments/updateAsync",
  updatePaymentStatus
);

export const adminPaymentsSlice = createSlice({
  name: "AdminPayments/AsyncActions",
  initialState,
  extraReducers: {
    [getPaymentsList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getPaymentsList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload.payments;
      state.pageCount = payload.countPage;
    },
    [getPaymentsList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    [updatePayment.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updatePayment.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updatePayment.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    // for searching modal
    [searchPaymentList.pending]: (state) => {
      state.isSearchLoading = true;
    },
    [searchPaymentList.fulfilled]: (state, { payload }) => {
      state.isSearchLoading = false;
      state.searchList = payload.payments;
      // state.pageCount = payload.countPage;
    },
  },
});

export default adminPaymentsSlice.reducer;
