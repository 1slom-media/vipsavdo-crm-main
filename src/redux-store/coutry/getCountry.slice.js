import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCountry } from "api/requests";

const initialState = {
  isLoading: false,
  data: [],
};

export const getCountry = createAsyncThunk(
  "dashboard/getCountry",
  getAllCountry
);

export const countryReducer = createSlice({
  name: "dashboard/getAllCountry",
  initialState,
  extraReducers: {
    [getCountry.pending]: (state) => {
      state.isLoading = true;
    },
    [getCountry.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getCountry.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default countryReducer.reducer;
