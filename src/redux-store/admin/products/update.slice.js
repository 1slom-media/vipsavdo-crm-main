import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "api/requests";

const initialState = {
  isLoading: false,
  updateID: null,
  isSpamLoading: false,
  error: {},
};

export const updateAdminProduct = createAsyncThunk(
  "products-list/updateAdminProduct",
  updateProduct
);

export const adminUpdateProductSlice = createSlice({
  name: "products/updateSlice",
  initialState,
  reducers: {
    setUpdateID: (state, { payload }) => {
      state.updateID = payload;
    },
  },
  extraReducers: {
    [updateAdminProduct.pending]: (state) => {
      state.isLoading = true;
      state.isSpamLoading = true;
    },
    [updateAdminProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSpamLoading = false;
      state.error = payload;
    },
    [updateAdminProduct.rejected]: (state) => {
      state.isLoading = false;
      state.isSpamLoading = false;
    },
  },
});

export const { setUpdateID } = adminUpdateProductSlice.actions;

export default adminUpdateProductSlice.reducer;
