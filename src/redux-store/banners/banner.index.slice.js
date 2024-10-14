import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAllSiteBanners,
  getAdminCarouselBanners,
  deleteAdminCarouselBanner,
  updateAdminBannerStatus,
} from "api/requests";

const initialState = {
  isAddLoading: false,
  //get carousel banners
  list: [],
  isGetLoading: false,
  //deleteCarouselBanner
  isDeleteLoading: false,
  //updateAdminBannerStatus
  isUpdateLoading: false,
};

export const addSiteBanner = createAsyncThunk(
  "banner/addSiteBanner",
  addAllSiteBanners
);

export const getCarouselBanners = createAsyncThunk(
  "banner/getAdminCarouselBanners",
  getAdminCarouselBanners
);

export const deleteCarouselBanner = createAsyncThunk(
  "banner/deleteCarouselBanner",
  deleteAdminCarouselBanner
);

export const updateCarouselBanner = createAsyncThunk(
  "banner/updateAdminBannerStatus",
  updateAdminBannerStatus
);

export const bannersReducer = createSlice({
  name: "banners/handleSiteBanners",
  initialState,
  extraReducers: {
    [addSiteBanner.pending]: (state) => {
      state.isAddLoading = true;
    },
    [addSiteBanner.fulfilled]: (state, { payload }) => {
      state.isAddLoading = false;
    },
    [addSiteBanner.rejected]: (state) => {
      state.isAddLoading = false;
    },
    // get all banners
    [getCarouselBanners.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getCarouselBanners.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload;
    },
    [getCarouselBanners.rejected]: (state) => {
      state.isGetLoading = false;
    },
    // deleteCarouselBanner
    [deleteCarouselBanner.pending]: (state) => {
      state.isDeleteLoading = true;
    },
    [deleteCarouselBanner.fulfilled]: (state, { payload }) => {
      state.isDeleteLoading = false;
    },
    [deleteCarouselBanner.rejected]: (state) => {
      state.isDeleteLoading = false;
    },
    // updateAdminBannerStatus
    [updateCarouselBanner.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [updateCarouselBanner.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [updateCarouselBanner.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
  },
});

export default bannersReducer.reducer;
