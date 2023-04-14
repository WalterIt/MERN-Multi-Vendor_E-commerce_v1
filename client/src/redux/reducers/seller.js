import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
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
  ClearErrors: (state) => {
    state.error = null;
  },
});
