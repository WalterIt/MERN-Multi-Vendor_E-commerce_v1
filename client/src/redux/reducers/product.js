import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },
  // Get all Products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
    state.success = true;
  },
  getAllProductsShopFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },
  // Delete a Product of Shop
  deleteProductShopRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductShopSuccess: (state, action) => {
    state.isLoading = false;
    state.product = null;
    state.message = action.payload;
  },
  deleteProductShopFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
