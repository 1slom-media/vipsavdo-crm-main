import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsPagination, getSingleProduct } from "api/requests";

const initialState = {
  list: [],
  pageCount: 1,
  isLoading: false,
  isSingleLoading: false,
  single: {},

  searchList: [],
  searchLoading: false,
};

export const getAdminProducts = createAsyncThunk(
  "products-list/getAdminProducts",
  getProductsPagination
);

export const getAdminProductsBySearching = createAsyncThunk(
  "products-list/getAdminProductsBySearching",
  getProductsPagination
);

export const getAdminSingleProduct = createAsyncThunk(
  "products-list/getAdminSingleProducts",
  getSingleProduct
);

export const adminProducts = createSlice({
  name: "products/getByPagination",
  initialState,
  extraReducers: {
    [getAdminProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdminProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload?.products) {
        state.list = payload?.products;
        state.pageCount = payload?.countPage;
      }
    },
    [getAdminProducts.rejected]: (state) => {
      state.isLoading = false;
    },

    // get products-list by searching
    [getAdminProductsBySearching.pending]: (state) => {
      state.searchLoading = true;
    },
    [getAdminProductsBySearching.fulfilled]: (state, { payload }) => {
      state.searchLoading = false;
      if (payload?.products) {
        state.searchList = payload?.products;
        state.pageCount = payload?.countPage;
      }
      console.warn(state.searchList);
      console.warn(state.pageCount);
    },
    [getAdminProductsBySearching.rejected]: (state) => {
      state.searchLoading = false;
    },

    //get single admin product
    [getAdminSingleProduct.pending]: (state) => {
      state.isSingleLoading = true;
    },
    [getAdminSingleProduct.fulfilled]: (state, { payload }) => {
      state.isSingleLoading = false;
      state.single = payload;
    },
    [getAdminSingleProduct.rejected]: (state) => {
      state.isSingleLoading = false;
    },
  },
});

export default adminProducts.reducer;
