import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdminCustomersList,
  addOperatorAsync,
  getAdminOperatorsList,
  getAdminOperatorStats,
  editAdminCustomer,
  renewOperatorOrders,
} from "api/requests";

const initialState = {
  list: [],
  isStatsGetLoading: false,
  pageCount: 0,
  customerProfile: {},
  isGetLoading: false,
  isOrdersRemoveLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isDeleteLoading: false,
  isDeleteSucceeded: false,
  isAddLoading: false,
  isAddSucceeded: false,
  isProfileLoading: false,
  currentStatusOrders: "new",
  paymentsHistory: {},
  countPage: 0,
  size: 0,
  currentStatusPayments: "accepted",

  searchList: [],
  searchPageCount: 0,
  searchLoading: false,
};

export const getOperatorsList = createAsyncThunk(
  "Operators/getAsync",
  getAdminOperatorsList
);

export const searchOperatorList = createAsyncThunk(
  "Operators/searchOperatorList",
  getAdminOperatorsList
);

export const getOperatorProfile = createAsyncThunk(
  "Operators/getOperatorProfile",
  getAdminOperatorStats
);

export const getOperatorsOrderHistory = createAsyncThunk(
  "Operators/getStatisticsAsync",
  getAdminOperatorStats
);

export const renewOperatorOrderById = createAsyncThunk(
  "Operators/renewOperatorOrderById",
  renewOperatorOrders
);

export const getOperatorsPaymentsHistory = createAsyncThunk(
  "Operators/getPaymentHistory",
  getAdminOperatorStats
);

export const updateOperator = createAsyncThunk(
  "Operators/updateAsync",
  editAdminCustomer
);

export const deleteOperator = createAsyncThunk(
  "Operators/deleteAsync",
  getAdminCustomersList
);

export const addOperator = createAsyncThunk(
  "Operators/addAsync",
  addOperatorAsync
);

export const adminOperatorReducer = createSlice({
  name: "AdminOperators/AsyncActions",
  initialState,
  reducers: {
    setOrderStatus: (state, { payload }) => {
      state.currentStatusOrders = payload;
    },
    setPaymentStatus: (state, { payload }) => {
      state.currentStatusPayments = payload;
    },
  },
  extraReducers: {
    [getOperatorsList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getOperatorsList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload.users;
      state.pageCount = payload.pageCount;
    },
    [getOperatorsList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    // search operators list
    [searchOperatorList.pending]: (state) => {
      state.searchLoading = true;
    },
    [searchOperatorList.fulfilled]: (state, { payload }) => {
      state.searchLoading = false;
      state.searchList = payload.users;
      state.searchPageCount = payload.pageCount;
    },
    [searchOperatorList.rejected]: (state) => {
      state.searchLoading = false;
    },
    //
    [updateOperator.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateOperator.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateOperator.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    [deleteOperator.pending]: (state) => {
      state.isDeleteLoading = true;
      state.isDeleteSucceeded = false;
    },
    [deleteOperator.fulfilled]: (state, {}) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = true;
    },
    [deleteOperator.rejected]: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = false;
    },
    [addOperator.pending]: (state) => {
      state.isAddLoading = true;
      state.isAddSucceeded = false;
    },
    [addOperator.fulfilled]: (state, {}) => {
      state.isAddLoading = false;
      state.isAddSucceeded = true;
    },
    [addOperator.rejected]: (state) => {
      state.isAddLoading = false;
      state.isAddSucceeded = false;
    },
    [getOperatorProfile.pending]: (state) => {
      state.isProfileLoading = true;
    },
    [getOperatorProfile.fulfilled]: (state, { payload }) => {
      state.isProfileLoading = false;
      state.customerProfile = payload;
    },
    [getOperatorProfile.rejected]: (state) => {
      state.isProfileLoading = false;
    },
    [getOperatorsOrderHistory.pending]: (state) => {
      state.isStatsGetLoading = true;
    },
    [getOperatorsOrderHistory.fulfilled]: (state, { payload }) => {
      state.isStatsGetLoading = false;
      state.paymentsHistory = payload;
    },
    [getOperatorsOrderHistory.rejected]: (state) => {
      state.isStatsGetLoading = false;
    },
    [getOperatorsPaymentsHistory.pending]: (state) => {
      state.isStatsGetLoading = true;
    },
    [getOperatorsPaymentsHistory.fulfilled]: (state, { payload }) => {
      state.isStatsGetLoading = false;
      state.paymentsHistory = payload;
      state.countPage = payload.countPage;
    },
    [getOperatorsPaymentsHistory.rejected]: (state) => {
      state.isStatsGetLoading = false;
    },
    [renewOperatorOrderById.pending]: (state) => {
      state.isOrdersRemoveLoading = true;
    },
    [renewOperatorOrderById.fulfilled]: (state, { payload }) => {
      state.isOrdersRemoveLoading = false;
      state.paymentsHistory = payload;
      state.countPage = payload.countPage;
    },
    [renewOperatorOrderById.rejected]: (state) => {
      state.isOrdersRemoveLoading = false;
    },
  },
});

export const { setOrderStatus, setPaymentStatus } =
  adminOperatorReducer.actions;

export default adminOperatorReducer.reducer;
