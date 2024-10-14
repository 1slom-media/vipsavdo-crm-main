import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const checkboxSlice = createSlice({
  name: "checkbox/slice",
  initialState,
  reducers: {
    handleOrderCheck: (state, { payload }) => {
      const stateCopy = { ...state };
      const findIfExist = state.orders.find((item) => item === payload);
      if (findIfExist) {
        state.orders = stateCopy.orders.filter((item) => item !== payload);
      } else {
        state.orders.push(payload);
      }
    },
    clearSelectedOrders: (state, { payload }) => {
      state.orders = [];
    },
  },
});

export const { handleOrderCheck, clearSelectedOrders } = checkboxSlice.actions;

export default checkboxSlice.reducer;
