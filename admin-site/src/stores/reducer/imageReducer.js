import {
  SET_IMAGES,
  SET_IMAGES_ERROR,
  SET_IMAGES_LOADING,
} from "../action/actionType";

const initialState = {
  images: [],
  isLoading: true,
  err: "",
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload,
        isLoading: false,
      };
    case SET_IMAGES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_IMAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
