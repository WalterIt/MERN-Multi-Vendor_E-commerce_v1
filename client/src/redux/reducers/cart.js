import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const ifItemExists = state.cart.find((i) => i._id === item._id);

    if (ifItemExists) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === ifItemExists._id ? item : i)),
      };
    } else {
      return { ...state, cart: [...state.cart, item] };
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((item) => item._id !== action.payload),
    };
  },
});
