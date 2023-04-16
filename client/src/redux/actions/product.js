import axios from "axios";
import { server } from "../../server";

// Create Product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Get All Products Shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/getproducts-shop/${id}`
    );

    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailure",
      payload: error.response?.data?.message,
    });
  }
};
// Get All Products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });
    const { data } = await axios.get(`${server}/product/getproducts`);

    dispatch({
      type: "getAllProductsSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Delete a product of Shop
export const deleteProductShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductShopRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`
    );

    dispatch({
      type: "deleteProductShopSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductShopFailure",
      payload: error.response?.data?.message,
    });
  }
};
