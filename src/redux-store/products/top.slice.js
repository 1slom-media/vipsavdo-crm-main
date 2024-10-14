import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopProducts } from "api/requests";

const initialState = {
  list: [],
  pageCount: 1,
  isLoading: false,
};

export const getTopProductsAsync = createAsyncThunk(
  "products-list/topProducts",
  getTopProducts
);

export const getTopProductSlice = createSlice({
  name: "products/topProducts",
  initialState,
  extraReducers: {
    [getTopProductsAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [getTopProductsAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.products;
      state.pageCount = payload?.countPage;
    },
    [getTopProductsAsync.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getTopProductSlice.reducer;
