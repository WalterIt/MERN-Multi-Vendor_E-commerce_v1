import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoginUserRequest: (state) => {
    state.loading = true;
  },
  LoginUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoginUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  // Update User Information
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Update User Addresses
  updateUserAddressesRequest: (state) => {
    state.addressloading = true;
  },
  updateUserAddressesSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressesFailure: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
  // Delete User Address
  deleteUserAddressesRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressesSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressesFailure: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
