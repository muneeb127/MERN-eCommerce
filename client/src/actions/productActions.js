import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCT_LOADING,
  GET_ERRORS
} from "./types";

//Get current profile
export const getCurrentProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios.get("/api/products").then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: {}
      })
    );
};

export const createProduct = (productData, history) => dispatch => {
  axios
    .post("/api/products/add", productData)
    .then(res => history.push("/products"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Products Loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};