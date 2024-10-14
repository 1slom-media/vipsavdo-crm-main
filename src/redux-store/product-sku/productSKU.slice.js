import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSkUList, updateProductSKUList } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
  isUpdateLoading: false,
};

export const getProductSKUList = createAsyncThunk(
  "sku/getSKUList",
  getAllSkUList
);

export const updateSKUList = createAsyncThunk(
  "sku/updateSKUList",
  updateProductSKUList
);

export const productSKUReducer = createSlice({
  name: "sku/manageSKUList",
  initialState,
  extraReducers: {
    [getProductSKUList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductSKUList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getProductSKUList.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateSKUList.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [updateSKUList.fulfilled]: (state) => {
      state.isUpdateLoading = false;
    },
    [updateSKUList.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
  },
});

export default productSKUReducer.reducer;
