import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSiteFulldata, getAppSetting, updateWebApp } from "api/requests";

const initialState = {
  theme: "LIGHT",
  site_name: "",
  site_server: process.env.NEXT_PUBLIC_API,
  site_uid: null,
  site_logo: "",
  isLoading: false,
  smsCount: 0,
  smsBalance: 0,
  subscription: undefined,
  isNameOff: false,
  isQrOff: false,
  isAppLoading: false,
  isAppGetLoading: false,
  site: null,
};

export const getSiteData = createAsyncThunk(
  "settings/sitedata",
  getSiteFulldata
);

export const getAppSettings = createAsyncThunk(
  "settings/appSettings",
  getAppSetting
);

export const updateAppSettings = createAsyncThunk(
  "settings/updateAppSettings",
  updateWebApp
);

export const settingsSlice = createSlice({
  name: "alertByStatus",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setQrInCheck: (state, { payload }) => {
      state.isQrOff = !state.isQrOff;
    },
    setNameinCheck: (state, { payload }) => {
      state.isNameOff = !state.isNameOff;
    },
  },
  extraReducers: {
    [getSiteData.pending]: (state) => {
      state.isLoading = true;
    },
    [getSiteData.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      // if (payload) {
      //   state.site_server = payload.siteServer;
      //   state.site_uid = payload.uid;
      //   state.site_name = payload.name;
      //   state.smsCount = payload.smsCount;
      //   state.smsBalance = payload.smsBalance;
      //   state.subscription = payload.subscription;
      //   state.site_logo = payload.avatar;
      // }
    },
    [getSiteData.rejected]: (state) => {
      state.isLoading = false;
    },
    //Web app data
    [getAppSettings.pending]: (state) => {
      state.isAppGetLoading = true;
    },
    [getAppSettings.fulfilled]: (state, { payload }) => {
      state.isAppGetLoading = false;
      if (payload) {
        state.site = payload;
      }
    },
    [getAppSettings.rejected]: (state) => {
      state.isAppGetLoading = false;
    },
    //update Web app data
    [updateAppSettings.pending]: (state) => {
      state.isAppLoading = true;
    },
    [updateAppSettings.fulfilled]: (state, { payload }) => {
      state.isAppLoading = false;
    },
    [updateAppSettings.rejected]: (state) => {
      state.isAppLoading = false;
    },
  },
});

export const { setTheme, setQrInCheck, setNameinCheck } = settingsSlice.actions;

export default settingsSlice.reducer;
