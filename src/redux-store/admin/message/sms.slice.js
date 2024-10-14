import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSmsDetails, updateSmsSts } from "api/requests";

const initialState = {
  data: null,
  isLoading: false,
  isUpdateLoading: false,
};

export const getSmsSettings = createAsyncThunk(
  "get/smsSettings",
  getSmsDetails
);

export const updateSmsSettings = createAsyncThunk(
  "update/smsSettings",
  updateSmsSts
);

export const smsSlice = createSlice({
  name: "sms/settings",
  initialState,
  extraReducers: {
    [getSmsSettings.pending]: (state) => {
      state.isLoading = true;
    },
    [getSmsSettings.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getSmsSettings.rejected]: (state) => {
      state.isLoading = false;
    },
    //update sms settings
    [updateSmsSettings.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [updateSmsSettings.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [updateSmsSettings.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
  },
});

export default smsSlice.reducer;
