import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDashboardOrderStatistics,
  getDashboardWeeklyOrderCount,
  getDashboardMostSoldProducts,
  getOrdersByCityId,
} from "api/requests";

const initialState = {
  orderStatistics: {},
  isOrdersStatsLoading: false,
  weeklyOrderCount: 0,
  isWeeklyLoading: false,
  mostSoldList: [],
  statisticsByCity: [],
  isMostSoldLoading: false,
  isCityStatsLoading: false,
};

export const getDashboardOrdersStats = createAsyncThunk(
  "dashboard/getOrdersStatsAsync",
  getDashboardOrderStatistics
);

export const getWeeklyOrdersCount = createAsyncThunk(
  "dashboard/getWeeklyOrderscountAsync",
  getDashboardWeeklyOrderCount
);

export const getMostSoldProducts = createAsyncThunk(
  "dashboard/getDashboardMostSoldProducts",
  getDashboardMostSoldProducts
);

export const getOrdersByCity = createAsyncThunk(
  "dashboard/getAsyncCityOrders",
  getOrdersByCityId
);

export const adminDashboardReducer = createSlice({
  name: "Dashboard/AsyncActions",
  initialState,
  extraReducers: {
    [getDashboardOrdersStats.pending]: (state) => {
      state.isOrdersStatsLoading = true;
    },
    [getDashboardOrdersStats.fulfilled]: (state, { payload }) => {
      state.isOrdersStatsLoading = false;
      state.orderStatistics = payload;
    },
    [getDashboardOrdersStats.rejected]: (state) => {
      state.isOrdersStatsLoading = false;
    },
    [getOrdersByCity.pending]: (state) => {
      state.isCityStatsLoading = true;
    },
    [getOrdersByCity.fulfilled]: (state, { payload }) => {
      state.isCityStatsLoading = false;
      state.statisticsByCity = payload;
    },
    [getOrdersByCity.rejected]: (state) => {
      state.isCityStatsLoading = false;
    },
    [getWeeklyOrdersCount.pending]: (state) => {
      state.isWeeklyLoading = true;
    },
    [getWeeklyOrdersCount.fulfilled]: (state, { payload }) => {
      state.isWeeklyLoading = false;
      state.weeklyOrderCount = payload;
    },
    [getWeeklyOrdersCount.rejected]: (state) => {
      state.isWeeklyLoading = false;
    },
    [getMostSoldProducts.pending]: (state) => {
      state.isMostSoldLoading = true;
    },
    [getMostSoldProducts.fulfilled]: (state, { payload }) => {
      state.isMostSoldLoading = false;
      state.mostSoldList = payload;
    },
    [getMostSoldProducts.rejected]: (state) => {
      state.isMostSoldLoading = false;
    },
  },
});

export default adminDashboardReducer.reducer;
