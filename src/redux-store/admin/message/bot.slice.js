import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBotDetails, updateTelegramBot } from "api/requests";

const initialState = {
  data: null,
  isLoading: false,
  isUpdateLoading: false,
};

export const getBotSettings = createAsyncThunk(
  "get/botSettings",
  getBotDetails
);

export const updateBotSettings = createAsyncThunk(
  "update/botSettings",
  updateTelegramBot
);

export const botSlice = createSlice({
  name: "bot/settings",
  initialState,
  extraReducers: {
    [getBotSettings.pending]: (state) => {
      state.isLoading = true;
    },
    [getBotSettings.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getBotSettings.rejected]: (state) => {
      state.isLoading = false;
    },
    //update bot settings
    [updateBotSettings.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [updateBotSettings.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [updateBotSettings.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
  },
});

export default botSlice.reducer;
