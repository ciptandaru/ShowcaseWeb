import {legacy_createStore as createStore} from "redux";
import {combineReducers} from "redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducer/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
