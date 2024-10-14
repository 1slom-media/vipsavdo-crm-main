import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsByCategory } from "api/requests";

const initialState = {
  data: [],
  isLoading: false,
};

export const getByCategoryAction = createAsyncThunk(
  "products-list/fecthProductsByCategory",
  getProductsByCategory
);

export const getByCategorySlice = createSlice({
  name: "products/getByCategory",
  initialState,
  extraReducers: {
    [getByCategoryAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getByCategoryAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getByCategoryAction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default getByCategorySlice.reducer;
