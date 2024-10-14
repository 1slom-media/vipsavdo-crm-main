import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleProduct } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
};

export const getProduct = createAsyncThunk(
  "products-list/fecthSingleProduct",
  getSingleProduct
);

export const singleProductGet = createSlice({
  name: "products/getSingleProduct",
  initialState,
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default singleProductGet.reducer;
