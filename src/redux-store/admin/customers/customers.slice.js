import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdminCustomersList,
  addOperatorAsync,
  getAdminCustomersStats,
  editAdminCustomer,
} from "api/requests";

const initialState = {
  pageCount: 0,
  customers: [],
  paymentsHistory: {},
  isPaymentHistoryLoading: false,
  paymentStatusFilter: "accepted",
  orderStatusFilter: "new",
  customerProfile: {},
  isProfileLoading: false,
  isGetLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isDeleteLoading: false,
  isDeleteSucceeded: false,
  isAddLoading: false,
  isAddSucceeded: false,

  searchPageCount: 0,
  searchList: [],
  searchLoading: false,
};

export const getCustomersList = createAsyncThunk(
  "customers/getAsync",
  getAdminCustomersList
);

export const searchCustomer = createAsyncThunk(
  "customers/searchCustomer",
  getAdminCustomersList
);

export const getCustomersOrderHistory = createAsyncThunk(
  "customers/getStatisticsAsync",
  getAdminCustomersStats
);

export const getCustomersPaymentsHistory = createAsyncThunk(
  "customers/getPaymentHistory",
  getAdminCustomersStats
);

export const getCustomerProfile = createAsyncThunk(
  "customers/getStatProfileAsync",
  getAdminCustomersStats
);

export const updateCustomer = createAsyncThunk(
  "customers/updateAsync",
  editAdminCustomer
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteAsync",
  getAdminCustomersList
);

export const addCustomer = createAsyncThunk(
  "customers/addAsync",
  addOperatorAsync
);

export const adminCustomersReducer = createSlice({
  name: "AdminCustomers/AsyncActions",
  initialState,
  reducers: {
    setPaymentStatus: (state, { payload }) => {
      state.paymentStatusFilter = payload;
    },
    setOrderStatus: (state, { payload }) => {
      state.orderStatusFilter = payload;
    },
  },
  extraReducers: {
    [getCustomersList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getCustomersList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.customers = payload.users;
      state.countPage = payload.pageCount;
    },
    [getCustomersList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    // search customers
    [searchCustomer.pending]: (state) => {
      state.searchLoading = true;
    },
    [searchCustomer.fulfilled]: (state, { payload }) => {
      state.searchLoading = false;
      state.searchList = payload.users;
      state.searchPageCount = payload.pageCount;
    },
    [searchCustomer.rejected]: (state) => {
      state.isGetLoading = false;
    },
    //
    [getCustomersPaymentsHistory.pending]: (state) => {
      state.isPaymentHistoryLoading = true;
    },
    [getCustomersPaymentsHistory.fulfilled]: (state, { payload }) => {
      state.isPaymentHistoryLoading = false;
      state.paymentsHistory = payload;
      state.countPage = payload.countPage;
    },
    [getCustomersPaymentsHistory.rejected]: (state) => {
      state.isPaymentHistoryLoading = false;
    },
    [updateCustomer.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateCustomer.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateCustomer.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    [deleteCustomer.pending]: (state) => {
      state.isDeleteLoading = true;
      state.isDeleteSucceeded = false;
    },
    [deleteCustomer.fulfilled]: (state, {}) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = true;
    },
    [deleteCustomer.rejected]: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = false;
    },
    [addCustomer.pending]: (state) => {
      state.isAddLoading = true;
      state.isAddSucceeded = false;
    },
    [addCustomer.fulfilled]: (state, {}) => {
      state.isAddLoading = false;
      state.isAddSucceeded = true;
    },
    [addCustomer.rejected]: (state) => {
      state.isAddLoading = false;
      state.isAddSucceeded = false;
    },
    [getCustomerProfile.pending]: (state) => {
      state.isProfileLoading = true;
    },
    [getCustomerProfile.fulfilled]: (state, { payload }) => {
      state.isProfileLoading = false;
      state.customerProfile = payload;
    },
    [getCustomerProfile.rejected]: (state) => {
      state.isProfileLoading = false;
    },
  },
});

export const { setPaymentStatus, setOrderStatus } =
  adminCustomersReducer.actions;

export default adminCustomersReducer.reducer;
