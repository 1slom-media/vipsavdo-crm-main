import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategory } from "api/requests";

const initialState = {
  isLoading: false,
};

export const createAdminCategory = createAsyncThunk(
  "category/createAdminCategory",
  createCategory
);
export const createAdminCategorySlice = createSlice({
  name: "createCategory",
  initialState,
  extraReducers: {
    [createAdminCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [createAdminCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [createAdminCategory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default createAdminCategorySlice.reducer;
