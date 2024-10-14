import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBrandsByCategory,
  deleteBrandsByUid,
  getBrandsAll,
  updateBrandsByUid,
} from "api/requests";

const initialState = {
  isLoading: false,
  data: [],
  isCreateLoading: false,
  isDeleteLoading: false,
};

export const getBrands = createAsyncThunk("dashboard/getBrands", getBrandsAll);

export const createBrands = createAsyncThunk(
  "dashboard/createBrands",
  createBrandsByCategory
);

export const updateBrands = createAsyncThunk(
  "dashboard/updateBrands",
  updateBrandsByUid
);

export const deleteBrands = createAsyncThunk(
  "dashboard/deleteBrands",
  deleteBrandsByUid
);

export const brandsReducer = createSlice({
  name: "dashboard/brands",
  initialState,
  extraReducers: {
    [getBrands.pending]: (state) => {
      state.isLoading = true;
    },
    [getBrands.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getBrands.rejected]: (state) => {
      state.isLoading = false;
    },
    // create brands
    [createBrands.pending]: (state) => {
      state.isCreateLoading = true;
    },
    [createBrands.fulfilled]: (state) => {
      state.isCreateLoading = false;
    },
    [createBrands.rejected]: (state) => {
      state.isCreateLoading = false;
    },
  },
});

export default brandsReducer.reducer;
