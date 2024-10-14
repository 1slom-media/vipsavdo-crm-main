import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteGameById,
  getUserGame,
  postDataGame,
  putGameData,
  getUserGameById,
} from "api/requests";

const initialState = {
  isLoading: false,
  isGameLoading: false,
  data: [],
  users: [],
};

export const getAdminGame = createAsyncThunk(
  "products-list/getAdminGame",
  getUserGame
);
export const getGameById = createAsyncThunk(
  "products/getGameById",
  getUserGameById
);

export const postAdminGame = createAsyncThunk(
  "products-list/postAdminGame",
  postDataGame
);

export const deleteAdminGame = createAsyncThunk(
  "products-list/deleteAdminGame",
  deleteGameById
);

export const putAdminGame = createAsyncThunk(
  "products-list/putAdminGame",
  putGameData
);

export const adminGameReducer = createSlice({
  name: "products/createSlice",
  initialState,
  extraReducers: {
    
    [getAdminGame.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdminGame.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getAdminGame.rejected]: (state) => {
      state.isLoading = false;
    },

    // getGameById

    [getGameById.pending]: (state) => {
      state.isLoading = true;
    },
    [getGameById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getGameById.rejected]: (state) => {
      state.isLoading = false;
    },

    // postAdminGame

    [postAdminGame.pending]: (state) => {
      state.isGameLoading = true;
    },
    [postAdminGame.fulfilled]: (state) => {
      state.isGameLoading = false;
    },
    [postAdminGame.rejected]: (state) => {
      state.isGameLoading = false;
    },

    // putAdminGame

    [putAdminGame.pending]: (state) => {
      state.isGameLoading = true;
    },
    [putAdminGame.fulfilled]: (state) => {
      state.isGameLoading = false;
    },
    [putAdminGame.rejected]: (state) => {
      state.isGameLoading = false;
    },
    // deleteAdminGame

    [deleteAdminGame.pending]: (state) => {
      state.isGameLoading = true;
    },
    [deleteAdminGame.fulfilled]: (state) => {
      state.isGameLoading = false;
    },
    [deleteAdminGame.rejected]: (state) => {
      state.isGameLoading = false;
    },
  },
});

export default adminGameReducer.reducer;
