import {API_URL} from "../../config/api";
import {
  ADD_PRODUCT,
  PRODUCT_FETCH_ONE,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,
  SET_PRODUCT_LOADING,
} from "./actionType";

const setProduct = (payload) => ({
  type: SET_PRODUCT,
  payload: payload,
});
const setProductLoading = (payload) => ({
  type: SET_PRODUCT_LOADING,
  payload: payload,
});
const setProductError = () => ({
  type: SET_PRODUCT_ERROR,
});
export const fetchProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setProductLoading(true));
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (!response.status) {
        throw response.data;
      }
      const payload = await response.json();
      dispatch(setProduct(payload));
      //   setProduct(payload);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};
//========================Fetch Product End====================================//
//========================Post Product====================================//
const PostProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload: payload,
}); //action
export const addPostProduct = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();
      dispatch(PostProduct(payload));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
}; // middleware
//========================Post Product End====================================//
//========================Detail Product====================================//
const oneProduct = (payload) => ({
  type: PRODUCT_FETCH_ONE,
  payload,
});
export const fetchOneProduct = (slug) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/products/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();
      dispatch(oneProduct(payload));
    } catch (err) {
      console.log(err);
    }
  };
};
//========================Detail Product====================================//
