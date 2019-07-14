import axios from "axios";
import { GET_PRODUCTS, PRODUCT_LOADING } from "./types";

//Get current profile
export const getCurrentProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios.get("/api/products").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch({
  //     type: GET_PRODUCTS,
  //     payload: {}
  //   })
  // );
};

//Products Loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
