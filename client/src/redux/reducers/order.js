import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // Get all Orders of an User
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
    state.success = true;
  },
  getAllOrdersUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },

  // Get all Orders of a Shop
  getAllOrdersSellerRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersSellerSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
    state.success = true;
  },
  getAllOrdersSellerFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },

  // Delete a Product of Shop
  deleteOrderUserRequest: (state) => {
    state.isLoading = true;
  },
  deleteOrderUserSuccess: (state, action) => {
    state.isLoading = false;
    state.order = null;
    state.message = action.payload;
  },
  deleteOrderUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
