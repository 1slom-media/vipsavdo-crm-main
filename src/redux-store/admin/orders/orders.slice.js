import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdminCustomersList,
  getAdminOrders,
  getAdminOrdersByStatus,
  searchAdminOrders,
  getSingleOrder,
  getOrdersFromQr,
  changeOrderStatusFromArchived,
  changeManyOrders,
  createOrder,
  updateOrdersByFilter,
} from "api/requests";

const initialState = {
  list: [],
  pageCount: 0,
  searchResult: [],
  qrResults: [],
  isQrLoading: false,
  isGetLoading: false,
  isListLoading: false,
  isUpdateLoading: false,
  isUpdateSucceeded: false,
  isSearchLoading: false,
  isAddLoading: false,
  isAddSucceeded: false,
  statusFilter: "new",
  isFilterUpdateLoading: false,
  //single order data
  isManualCreateLoading: false,
  isSingleLoading: false,
  orderProducts: [],
  singleOrder: null,
  manyOrders: [],
  size: 0,
};

export const getOrdersList = createAsyncThunk(
  "Orders/getAsync",
  getAdminOrders
);

export const updateFilteredOrders = createAsyncThunk(
  "Orders/updateFilteredOrders",
  updateOrdersByFilter
);

export const createManualOrder = createAsyncThunk(
  "Orders/createManualOrder",
  createOrder
);

export const getAdminSingleOrder = createAsyncThunk(
  "Orders/getSingleOrderAsync",
  getSingleOrder
);

export const getOrdersByStatus = createAsyncThunk(
  "OrdersByStatus/getAsync",
  getAdminOrdersByStatus
);

export const searchOrders = createAsyncThunk(
  "Orders/searchAsync",
  searchAdminOrders
);

export const updateOrder = createAsyncThunk(
  "Orders/updateAsync",
  changeOrderStatusFromArchived
);

export const updateOrders = createAsyncThunk(
  "Orders/updateManyOrders",
  changeManyOrders
);

export const deleteOrder = createAsyncThunk(
  "Orders/deleteAsync",
  getAdminCustomersList
);

export const getOrdersFromQrCode = createAsyncThunk(
  "Orders/getOrdersFromQrCode",
  getOrdersFromQr
);

export const adminOperatorReducer = createSlice({
  name: "Orders/AsyncActions",
  initialState,
  reducers: {
    setOrderFilter: (state, { payload }) => {
      state.statusFilter = payload;
    },
    handleSingleselect(state, { payload }) {
      const findId = state.manyOrders.find((id) => id === payload);
      if (findId) {
        state.manyOrders = state.manyOrders.filter((id) => id !== payload);
      } else {
        state.manyOrders.push(payload);
      }
    },
    handleMultipleSelect(state, { payload }) {
      if (JSON.stringify(state.manyOrders) === JSON.stringify(payload)) {
        state.manyOrders = [];
      } else {
        state.manyOrders = payload;
      }
    },
    clearSelection(state, { payload }) {
      state.manyOrders = [];
    },
    clearOrderProducts(state) {
      state.orderProducts = [];
    },
    increaseQuantity(state, { payload }) {
      const stateCopy = [...state.orderProducts];
      const findIfExist = stateCopy.find(
        (item) => item.productId?._id === payload
      );
      if (findIfExist) {
        const index = state.orderProducts.findIndex(
          (item) => item.productId?._id === payload
        );
        state.orderProducts[index].quantity += 1;
      }
    },
    decreaseQuantity(state, { payload }) {
      const stateCopy = [...state.orderProducts];
      const findIfExist = stateCopy.find(
        (item) => item.productId?._id === payload
      );
      if (findIfExist && findIfExist?.quantity > 1) {
        const index = state.orderProducts.findIndex(
          (item) => item.productId?._id === payload
        );
        state.orderProducts[index].quantity -= 1;
      }
    },
    removeProduct(state, { payload }) {
      const stateCopy = [...state.orderProducts];
      const findIfExist = stateCopy.find(
        (item) => item.productId?._id === payload
      );
      if (findIfExist !== -1) {
        const index = stateCopy.findIndex(
          (item) => item.productId._id === payload
        );
        state.orderProducts = stateCopy
          .slice(0, index)
          .concat(stateCopy.slice(index + 1));
      }
    },
    addProduct(state, { payload }) {
      const stateCopy = [...state.orderProducts];
      const findIfExist = stateCopy.find(
        (item) => item.productId?._id === payload
      );
      if (!findIfExist) {
        state.orderProducts.push(payload);
      }
    },
  },
  extraReducers: {
    [getOrdersByStatus.pending]: (state) => {
      state.isListLoading = true;
    },
    [getOrdersByStatus.fulfilled]: (state, { payload }) => {
      state.isListLoading = false;
      state.list = payload.orders;
      state.pageCount = payload.countPage;
      state.size = payload.size;
    },
    [getOrdersByStatus.rejected]: (state) => {
      state.isListLoading = false;
    },
    [getOrdersList.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getOrdersList.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.list = payload.orders;
      state.pageCount = payload.countPage;
    },
    [getOrdersList.rejected]: (state) => {
      state.isGetLoading = false;
    },
    [searchOrders.pending]: (state) => {
      state.isSearchLoading = true;
    },
    [searchOrders.fulfilled]: (state, { payload }) => {
      state.isSearchLoading = false;
      state.searchResult = payload;
    },
    [searchOrders.rejected]: (state) => {
      state.isSearchLoading = false;
    },
    [updateOrder.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateOrder.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateOrder.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    [updateOrders.pending]: (state) => {
      state.isUpdateLoading = true;
      state.isUpdateSucceded = false;
    },
    [updateOrders.fulfilled]: (state, {}) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = true;
    },
    [updateOrders.rejected]: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateSucceded = false;
    },
    [deleteOrder.pending]: (state) => {
      state.isDeleteLoading = true;
      state.isDeleteSucceeded = false;
    },
    [deleteOrder.fulfilled]: (state, {}) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = true;
    },
    [deleteOrder.rejected]: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteSucceeded = false;
    },
    //get single order
    [getAdminSingleOrder.pending]: (state) => {
      state.isSingleLoading = true;
    },
    [getAdminSingleOrder.fulfilled]: (state, { payload }) => {
      state.isSingleLoading = false;
      state.singleOrder = payload;
      state.orderProducts = payload?.orderItems;
    },
    [getAdminSingleOrder.rejected]: (state) => {
      state.isSingleLoading = false;
    },
    // qr code
    [getOrdersFromQrCode.pending]: (state) => {
      state.isQrLoading = true;
    },
    [getOrdersFromQrCode.fulfilled]: (state, { payload }) => {
      state.isQrLoading = false;
      state.qrResults = payload;
    },
    [getOrdersFromQrCode.rejected]: (state) => {
      state.isQrLoading = false;
    },
    // createManualOrder
    [createManualOrder.pending]: (state) => {
      state.isManualCreateLoading = true;
    },
    [createManualOrder.fulfilled]: (state, { payload }) => {
      state.isManualCreateLoading = false;
    },
    [createManualOrder.rejected]: (state) => {
      state.isManualCreateLoading = false;
    },
    // updateFilteredOrders
    [updateFilteredOrders.pending]: (state) => {
      state.isFilterUpdateLoading = true;
    },
    [updateFilteredOrders.fulfilled]: (state, { payload }) => {
      state.isFilterUpdateLoading = false;
    },
    [updateFilteredOrders.rejected]: (state) => {
      state.isFilterUpdateLoading = false;
    },
  },
});

export const {
  setOrderFilter,
  handleSingleselect,
  clearSelection,
  clearOrderProducts,
  handleMultipleSelect,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  addProduct,
} = adminOperatorReducer.actions;

export default adminOperatorReducer.reducer;
