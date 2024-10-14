import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchProduct } from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
};

export const searchProductAction = createAsyncThunk(
  "products-list/searchProduct",
  searchProduct
);

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState,
  extraReducers: {
    [searchProductAction.pending]: (state) => {
      state.isLoading = true;
    },
    [searchProductAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [searchProductAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default searchProductSlice.reducer;
