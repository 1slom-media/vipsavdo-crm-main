import { getDevicesAnalytics } from "api/yandex-metrika-reports";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: null,
  isDeviceLoading: false,
};

export const getVisistedDevices = createAsyncThunk(
  "metrika/getDeviceAnalytics",
  getDevicesAnalytics
);

export const metrikaReducer = createSlice({
  name: "metrika/analytics",
  initialState,
  extraReducers: {
    [getVisistedDevices.pending]: (state) => {
      state.isDeviceLoading = true;
    },
    [getVisistedDevices.fulfilled]: (state, { payload }) => {
      state.isDeviceLoading = false;
      state.devices = payload;
    },
    [getVisistedDevices.rejected]: (state) => {
      state.isDeviceLoading = false;
    },
  },
});

export default metrikaReducer.reducer;
