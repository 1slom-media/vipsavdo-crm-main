import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "api/requests";

const initialState = {
  isLoading: false,
  updateID: null,
  error: {},
};

export const updateAdminSpamProduct = createAsyncThunk(
  "products-list/updateAdminSpamProduct",
  updateProduct
);

export const updateSpamProduct = createSlice({
  name: "products/updateSpamAdminProduct",
  initialState,
  reducers: {
    setUpdateID: (state, { payload }) => {
      state.updateID = payload;
    },
  },
  extraReducers: {
    [updateAdminSpamProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAdminSpamProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;

      state.error = payload;
    },
    [updateAdminSpamProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setUpdateID } = updateSpamProduct.actions;

export default updateSpamProduct.reducer;
