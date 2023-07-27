import {
  ADD_CATEGORY,
  CATEGORY_DELETE,
  CATEGORY_EDIT,
  CATEGORY_FETCH_ONE,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  SET_CATEGORY_LOADING,
} from "../action/actionType";

const initialState = {
  categories: [],
  categoriesDetail: [],
  isLoading: true,
  err: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case SET_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        err: action.payload,
      };
    case CATEGORY_EDIT:
      return {
        ...state,
        err: action.payload,
      };
    case CATEGORY_FETCH_ONE:
      return {
        ...state,
        categoriesDetail: action.payload,
      };
    case CATEGORY_DELETE:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;
