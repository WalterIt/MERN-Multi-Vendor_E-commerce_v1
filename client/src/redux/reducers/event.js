import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  EventCreateRequest: (state) => {
    state.isLoading = true;
  },
  EventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  },
  EventCreateFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },
  // Get all Events of shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  },
  getAllEventsShopFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },
  // Get all Events
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
    state.success = true;
  },
  getAllEventsFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
    state.success = false;
  },
  // Delete a Event of Shop
  deleteEventShopRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventShopSuccess: (state, action) => {
    state.isLoading = false;
    state.event = null;
    state.message = action.payload;
  },
  deleteEventShopFailure: (state, action) => {
    state.isLoading = false;
    state.error = action?.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
