import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendSMSCode, confirmOTPCode } from "api/requests";

const initialState = {
  isLoading: false,
  token: null,
  isAdmin: false,
  status: 1,
  isAuth: false,
  isAuthCodeLoading: false,
  smsSent: false,
  isConfirmCodeLoading: false,
  phoneNumber: "",
  sessionExpired: false,
  sessionStartedTime: undefined,
  sessionEndTime: undefined
};

export const sendPhoneAuthCode = createAsyncThunk(
  "auth/sendAuthCode",
  sendSMSCode
);

export const confirmSMSCode = createAsyncThunk(
  "auth/confirmAuthCode",
  confirmOTPCode
);

export const userAuthReducer = createSlice({
  name: "auth/makeAuthrequests",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setPhoneNumber(state, { payload }) {
      state.phoneNumber = payload;
    },
    removeUser: (state, {}) => {
      state.token = null;
      state.isAuth = false;
      state.phoneNumber = "";
      state.smsSent = false;
      state.isAdmin = false;
    },
    closeUserSessionModal(state) {
      state.sessionExpired = false;
    },
    openUserSessionModal(state) {
      state.sessionExpired = true;
      state.isLoading = false;
      state.token = null;
      state.isAdmin = false;
      state.status = 0;
      state.isAuth = false;
      state.phoneNumber = "";
      state.sessionStartedTime = undefined;
    },
  },
  extraReducers: {
    //send auth code
    [sendPhoneAuthCode.pending]: (state) => {
      state.isAuthCodeLoading = true;
      state.isAuth = false;
      state.smsSent = false;
    },
    [sendPhoneAuthCode.fulfilled]: (state, { payload }) => {
      state.isAuthCodeLoading = false;
      if (payload?.success) {
        state.isAuth = false;
        state.smsSent = true;
      }
    },
    [sendPhoneAuthCode.rejected]: (state) => {
      state.isAuthCodeLoading = false;
      state.isAuth = false;
      state.smsSent = false;
    },
    //confirm auth code
    [confirmSMSCode.pending]: (state) => {
      state.isConfirmCodeLoading = true;
      state.isAuth = false;
      state.smsSent = false;
    },
    [confirmSMSCode.fulfilled]: (state, { payload }) => {
      state.isConfirmCodeLoading = false;
      state.token = payload.token?.token;
      state.sessionEndTime = payload.token?.expiresAt;
      state.isAdmin = payload.isAdmin;
      state.status = payload.status;
      state.isAuth = true;
      state.smsSent = false;
      state.sessionStartedTime = new Date();
    },
    [confirmSMSCode.rejected]: (state) => {
      state.isConfirmCodeLoading = false;
      state.isAuth = false;
      state.smsSent = false;
    },
  },
});
export const {
  setPhoneNumber,
  removeUser,
  openUserSessionModal,
  closeUserSessionModal,
} = userAuthReducer.actions;

export default userAuthReducer.reducer;
