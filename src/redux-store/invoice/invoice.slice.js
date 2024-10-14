import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInvoicesByStatus } from "api/requests";

const initialState = {
  list: [],
  pageCount: 0,
  size: 0,
  limit: 10,
  isGetLoading: false,
};

export const getInvoiceListByStatus = createAsyncThunk(
  "invoices/fecthInvoicesList",
  getInvoicesByStatus
);

export const invoicesSlice = createSlice({
  name: "invoices/invoiceActions",
  initialState,
  extraReducers: {
    [getInvoiceListByStatus.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getInvoiceListByStatus.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      if (payload?.orders) {
        state.list = payload?.orders;
      }
      if (payload?.invoices) {
        state.list = payload?.invoices;
      }
      state.size = payload?.size;
      state.pageCount = payload?.countPage;
    },
    [getInvoiceListByStatus.rejected]: (state) => {
      state.isGetLoading = false;
    },
  },
});

export default invoicesSlice.reducer;
