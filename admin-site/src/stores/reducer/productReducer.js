import {
  ADD_PRODUCT,
  ADD_PRODUCT_ERR,
  PRODUCT_DELETE,
  PRODUCT_EDIT,
  PRODUCT_FETCH_ONE,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,
  SET_PRODUCT_LOADING,
} from "../action/actionType";

const initialState = {
  products: [],
  detailProduct: [],
  isLoading: true,
  err: "",
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case SET_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_PRODUCT_ERROR:
      console.log(action.payload, "<<<<<<<<<<<<<<<<<<");

      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        err: "",
      };
    case ADD_PRODUCT_ERR:
      return {
        ...state,
        err: action.payload,
      };
    case PRODUCT_EDIT:
      return {
        ...state,
        err: action.payload,
      };
    case PRODUCT_FETCH_ONE:
      return {
        ...state,
        detailProduct: action.payload,
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
