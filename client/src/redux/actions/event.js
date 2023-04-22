import axios from "axios";
import { server } from "../../server";

// Create Event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "EventCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`${server}/event/create-event`, newForm);

    dispatch({
      type: "EventCreateSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: "EventCreateFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Get All Events Products Shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });
    const { data } = await axios.get(`${server}/event/getevents-shop/${id}`);

    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Get All Events Products
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });
    const { data } = await axios.get(`${server}/event/getevents`);

    dispatch({
      type: "getAllEventsSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Delete an Event product of Shop
export const deleteEventShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventShopRequest",
    });
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`
    );

    dispatch({
      type: "deleteEventShopSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventShopFailure",
      payload: error.response?.data?.message,
    });
  }
};
