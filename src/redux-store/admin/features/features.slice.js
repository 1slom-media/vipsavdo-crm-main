import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createFeature,
  deleteFeature,
  getAllFeatures,
  getFeaturesAll,
  updateFeatureByUid,
} from "../../../api/requests";

const initialState = {
  list: [],
  pageCount: 0,
  isLoading: false,

  isCreateLoading: false,

  searchList: [],
  searchCount: 0,
  searchLoading: false,
};
export const getFeaturesList = createAsyncThunk(
  "Features/getFeaturesList",
  getAllFeatures
);

export const getAllFeaturesList = createAsyncThunk(
  "Features/getAllFeaturesList",
  getFeaturesAll
);

export const getFeaturesListBySearching = createAsyncThunk(
  "Features/getFeaturesListBySearching",
  getAllFeatures
);

export const createFeatureList = createAsyncThunk(
  "Features/createFeature",
  createFeature
);

export const deleteFeatureByUid = createAsyncThunk(
  "Features/deleteFeature",
  deleteFeature
);
export const updateFeature = createAsyncThunk(
  "Features/deleteFeature",
  updateFeatureByUid
);
export const featuresReducer = createSlice({
  name: "Features/AsyncActions",
  initialState,
  reducers: {
    getFeatures: (state, { payload }) => {
      state.list = payload.features;
      state.pageCount = payload.countPage;
    },
    clearFeatureBySearching: (state) => {
      state.searchList = [];
    },
  },
  extraReducers: {
    [getFeaturesList.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeaturesList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.features;
      state.pageCount = payload.countPage;
    },
    [getFeaturesList.rejected]: (state) => {
      state.isLoading = false;
    },
    
    // getAllFeatures

    [getAllFeaturesList.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllFeaturesList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [getAllFeaturesList.rejected]: (state) => {
      state.isLoading = false;
    },

    // search list
    [getFeaturesListBySearching.pending]: (state) => {
      state.searchLoading = true;
    },
    [getFeaturesListBySearching.fulfilled]: (state, { payload }) => {
      state.searchLoading = false;
      state.searchList = payload.features;
      state.searchCount = payload.countPage;
    },
    [getFeaturesListBySearching.rejected]: (state) => {
      state.searchLoading = false;
    },
    [createFeatureList.pending]: (state) => {
      state.isCreateLoading = true;
    },
    [createFeatureList.fulfilled]: (state, { payload }) => {
      state.isCreateLoading = false;
    },
    [createFeatureList.rejected]: (state) => {
      state.isCreateLoading = false;
    },
  },
});

export default featuresReducer.reducer;
