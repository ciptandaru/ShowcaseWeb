import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_ERR,
} from "../action/actionType";

const initialState = {
  access_token: "",
  err: "",
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      if (!action.payload.access_token) {
        return {
          ...state,
          err: action.payload,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          access_token: action.payload.access_token,
          err: action.payload,
          isLoading: false,
        };
      }
    case USER_LOGIN_ERROR:
      return {
        ...state,
        err: action.payload,
        isLoading: false,
      };
    case USER_REGISTER:
      return {
        ...state,
        err: action.payload,
        isLoading: false,
      };
    case USER_REGISTER_ERR:
      return {
        ...state,
        err: action.payload,
        isLoading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        access_token: "",
        isLoading: false,
        errMessage: "",
      };
    default:
      return state;
  }
};

export default userReducer;
