import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
  LoginSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoginSellerSuccess: (state, action) => {
    state.isSellerAuthenticated = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoginSellerFailure: (state, action) => {
    state.isSellerAuthenticated = false;
    state.isLoading = false;
    state.error = action?.payload;
  },

  // Load a Seller
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSellerAuthenticated = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFailure: (state, action) => {
    state.isSellerAuthenticated = false;
    state.isLoading = false;
    state.error = action?.payload;
  },
  // get all sellers ---admin
  getAllSellersRequest: (state) => {
    state.isLoading = true;
  },
  getAllSellersSuccess: (state, action) => {
    state.isLoading = false;
    state.sellers = action.payload;
  },
  getAllSellerFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
