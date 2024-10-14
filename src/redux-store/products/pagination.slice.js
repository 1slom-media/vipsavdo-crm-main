import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsPagination } from "api/requests";

const initialState = {
  list: [],
  pageCount: 1,
  isLoading: false,
};

export const getProductsByPagination = createAsyncThunk(
  "products-list/fecthProductsPagination",
  getProductsPagination
);

export const productsByDataPagination = createSlice({
  name: "products/getByPagination",
  initialState,
  extraReducers: {
    [getProductsByPagination.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByPagination.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload?.products;
      state.pageCount = payload?.countPage;
    },
    [getProductsByPagination.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productsByDataPagination.reducer;
