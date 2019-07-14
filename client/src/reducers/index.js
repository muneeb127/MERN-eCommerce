//A file to combine all the reducers we will use throughout the project
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  product: productReducer
});
