import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct } from "api/requests";

const initialState = {
  isLoading: false,
};

export const createAdminProduct = createAsyncThunk(
  "products-list/createAdminProduct",
  createProduct
);

export const adminCreateProductSlice = createSlice({
  name: "products/createSlice",
  initialState,
  extraReducers: {
    [createAdminProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createAdminProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [createAdminProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default adminCreateProductSlice.reducer;