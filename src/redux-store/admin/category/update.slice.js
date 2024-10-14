import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateCategory } from "api/requests";

const initialState = {
  isLoading: false,
};

export const updateAdminCategory = createAsyncThunk(
  "category/updateAdminCategory",
  updateCategory
);

export const updateAdminCategorySlice = createSlice({
  name: "updateCategory",
  initialState,
  extraReducers: {
    [updateAdminCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAdminCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [updateAdminCategory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default updateAdminCategorySlice.reducer;