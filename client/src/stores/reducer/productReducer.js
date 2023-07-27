import {
  PRODUCT_FETCH_ONE,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,
  SET_PRODUCT_LOADING,
} from "../action/actionType";

const initialState = {
  products: [],
  detailProduct: [],
  isLoading: true,
  error: {},
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
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PRODUCT_FETCH_ONE:
      return {
        ...state,
        detailProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
