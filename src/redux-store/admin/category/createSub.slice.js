import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSubCategory } from "api/requests";

const initialState = {
  isLoading: false,
};

export const createSubCategoryList = createAsyncThunk(
  "category/createSubCategoryList",
  createSubCategory
);

export const createSubCategorySlice = createSlice({
  name: "createSubCategory",
  initialState,
  extraReducers: {
    [createSubCategoryList.pending]: (state) => {
      state.isLoading = true;
    },
    [createSubCategoryList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [createSubCategoryList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default createSubCategorySlice.reducer;
