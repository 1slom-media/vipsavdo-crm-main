import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getOnlyOneCategory,
  getParentalCategories,
} from "api/requests";

const initialState = {
  list: [],
  isLoading: false,
  pageCount: 0,

  searchList: [],
  searchIsLoading: false,
  searchPageCount: 0,

  //get All categories in parental order
  parentalCategories: [],
  isParentalLoading: false,
};

export const getAllCategoryAction = createAsyncThunk(
  "category/getAllCategory",
  getAllCategories
);

export const getParentalCategoriesAction = createAsyncThunk(
  "category/getParentalCategoriesAction",
  getParentalCategories
);

export const getCategoryBySearchingAction = createAsyncThunk(
  "category/getCategoryBySearchingAction",
  getAllCategories
);

export const getOneCategoryAction = createAsyncThunk(
  "category/getOneCategoryAction",
  getOnlyOneCategory
);

export const getAllCategorySlice = createSlice({
  name: "getAllCategory",
  initialState,
  extraReducers: {
    [getAllCategoryAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategoryAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload.categories;
      state.pageCount = payload.countPage;
    },
    [getAllCategoryAction.rejected]: (state) => {
      state.isLoading = false;
    },

    // get one category because find sub category

    [getOneCategoryAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getOneCategoryAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getOneCategoryAction.rejected]: (state) => {
      state.isLoading = false;
    },

    //reducer for searching categories
    [getCategoryBySearchingAction.pending]: (state) => {
      state.searchIsLoading = true;
    },
    [getCategoryBySearchingAction.fulfilled]: (state, { payload }) => {
      state.searchIsLoading = false;
      if (payload?.categories) {
        state.searchList = payload.categories;
        state.searchPageCount = payload.countPage;
      }
    },

    [getCategoryBySearchingAction.rejected]: (state) => {
      state.searchIsLoading = false;
    },
    //getParentalCategoriesAction
    [getParentalCategoriesAction.pending]: (state) => {
      state.isParentalLoading = true;
    },
    [getParentalCategoriesAction.fulfilled]: (state, { payload }) => {
      state.isParentalLoading = false;
      state.parentalCategories = payload;
    },
    [getParentalCategoriesAction.rejected]: (state) => {
      state.isParentalLoading = false;
    },
  },
});

export default getAllCategorySlice.reducer;
