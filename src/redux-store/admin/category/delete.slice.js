import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCategory } from "api/requests";

const initialState = {
  isLoading: false,
};

export const deleteAdminCategory = createAsyncThunk(
  "category/deleteAdminCategory",
  deleteCategory
);

export const deleteAdminCategorySlice = createSlice({
  name: "deleteCategory",
  initialState,
  extraReducers: {
    [deleteAdminCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAdminCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteAdminCategory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default deleteAdminCategorySlice.reducer;