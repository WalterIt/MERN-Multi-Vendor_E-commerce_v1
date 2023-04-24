import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;
    const ifItemExists = state.wishlist.find((i) => i._id === item._id);

    if (ifItemExists) {
      return {
        ...state,
        wishlist: state.wishlist.map((i) =>
          i._id === ifItemExists._id ? item : i
        ),
      };
    } else {
      return { ...state, wishlist: [...state.wishlist, item] };
    }
  },

  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((item) => item._id !== action.payload),
    };
  },
});
