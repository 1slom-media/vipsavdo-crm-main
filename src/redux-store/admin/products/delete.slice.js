import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "api/requests";

const initialState = {
  isLoading: false,
};

export const deleteAdminProduct = createAsyncThunk(
  "products-list/deleteAdminProduct",
  deleteProduct
);

export const adminProducts = createSlice({
  name: "products/deletetSlice",
  initialState,
  extraReducers: {
    [deleteAdminProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAdminProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteAdminProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default adminProducts.reducer;
