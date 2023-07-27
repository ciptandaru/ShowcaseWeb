import {legacy_createStore as createStore} from "redux";
import {combineReducers} from "redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducer/productReducer";
import categoryReducer from "./reducer/categoryReducer";
import userReducer from "./reducer/userReducer";
import imageReducer from "./reducer/imageReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  users: userReducer,
  images: imageReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
