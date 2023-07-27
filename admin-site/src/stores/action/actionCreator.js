import {API_URL} from "../../config/api";
import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_PRODUCT_ERR,
  CATEGORY_DELETE,
  CATEGORY_EDIT,
  CATEGORY_FETCH_ONE,
  PRODUCT_DELETE,
  PRODUCT_EDIT,
  PRODUCT_FETCH_ONE,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  SET_CATEGORY_LOADING,
  SET_IMAGES,
  SET_IMAGES_ERROR,
  SET_IMAGES_LOADING,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,
  SET_PRODUCT_LOADING,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_ERR,
} from "./actionType";

//========================================Login&Register==========================
const login = (payload) => ({
  type: USER_LOGIN,
  payload: payload,
}); //action
const loginError = (payload) => ({
  type: USER_LOGIN_ERROR,
  payload,
});
export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      console.log(payload, "line 43");
      if (payload.message) {
        dispatch(loginError(payload.message));
      } else {
        dispatch(login(payload));
        localStorage.setItem("access_token", payload.accessToken);
      }
    } catch (err) {
      dispatch(loginError(err));
    }
  };
}; // middleware

export const logout = () => ({
  type: USER_LOGOUT,
});

const register = (payload) => ({
  type: USER_REGISTER,
  payload: payload,
}); //action
const registerError = (payload) => ({
  type: USER_REGISTER_ERR,
  payload,
});
export const userRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      console.log(payload, "line 43");
      if (payload.message) {
        dispatch(registerError(payload.message));
      } else {
        dispatch(register(payload));
      }
    } catch (err) {
      dispatch(registerError(err));
    }
  };
}; // middleware

//========================================Login&Register==========================

const setProduct = (payload) => ({
  type: SET_PRODUCT,
  payload: payload,
});
const setProductLoading = (payload) => ({
  type: SET_PRODUCT_LOADING,
  payload: payload,
});
const setProductError = () => ({
  type: SET_PRODUCT_ERROR,
});
export const fetchProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setProductLoading(true));
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();
      if (payload.message) {
        dispatch(setProductError(payload.message));
      } else {
        dispatch(setProduct(payload));
      }
      //   setProduct(payload);
    } catch (err) {
      console.log(err);
      dispatch(setProductError(err));
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};
//========================Fetch Product End====================================//
//========================Post Product====================================//
const PostProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload: payload,
}); //action
const getProductError = (payload) => ({
  type: ADD_PRODUCT_ERR,
  err: payload,
});
const getProductLoading = (payload) => ({
  type: SET_PRODUCT_LOADING,
  payload: payload,
});
export const addPostProduct = (data) => {
  return async (dispatch) => {
    dispatch(getProductLoading(true));
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();
      console.log(payload, "<<<<<<<<creator");
      if (payload.message) {
        dispatch(getProductError(payload.message));
      } else {
        dispatch(PostProduct(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(getProductError(err));
    } finally {
      dispatch(getProductLoading(false));
    }
  };
}; // middleware
//========================Post Product End====================================//
//========================Detail Product====================================//
const oneProduct = (payload) => ({
  type: PRODUCT_FETCH_ONE,
  payload,
});
export const fetchOneProduct = (slug) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();
      if (payload.message) {
        dispatch(getProductError(payload.message));
      } else {
        dispatch(oneProduct(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(getProductError(err));
    }
  };
};
//========================Detail Product====================================//
//========================EDITProduct====================================//
const PutProduct = (payload) => ({
  type: PRODUCT_EDIT,
  payload: payload,
}); //action
export const editProduct = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/${data.slug}`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();
      if (payload.message) {
        dispatch(getProductError(payload.message));
      } else {
        dispatch(PutProduct(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(getProductError(err));
    }
  };
}; // middleware
//========================EDITProductEND====================================//
//========================DEELTEProduct====================================//
const destroyProduct = (payload) => ({
  type: PRODUCT_DELETE,
  payload,
});
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();

      dispatch(destroyProduct(payload));
      dispatch(fetchProduct());
    } catch (err) {
      console.log(err);
    }
  };
};
//========================DEELTEProductEND====================================//

//========================Fetch Category====================================//
const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload: payload,
});
const setCategoryLoading = (payload) => ({
  type: SET_CATEGORY_LOADING,
  payload: payload,
});
const setCategoryError = () => ({
  type: SET_CATEGORY_ERROR,
});
export const fetchCategory = () => {
  return async (dispatch, getState) => {
    dispatch(setCategoryLoading(true));
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });

      const payload = await response.json();
      if (payload.message) {
        dispatch(setCategoryError(payload.message));
      } else {
        dispatch(setCategory(payload));
      }
      //   setProduct(payload);
    } catch (err) {
      console.log(err);
      dispatch(setCategoryError(err));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
};
//========================Fetch Category====================================//
//========================Post Product====================================//
const PostCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload: payload,
}); //action
export const addPostCategory = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();
      if (payload.message) {
        dispatch(setCategoryError(payload.message));
      } else {
        dispatch(PostCategory(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(setCategoryError(err));
    }
  };
}; // middleware
//========================Post Product End====================================//
//========================Detail Product====================================//
const oneCategory = (payload) => ({
  type: CATEGORY_FETCH_ONE,
  payload,
});
export const fetchOneCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();
      if (payload.message) {
        dispatch(setCategoryError(payload.message));
      } else {
        dispatch(oneCategory(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(setCategoryError(err));
    }
  };
};
//========================Detail Product====================================//
//========================EDITProduct====================================//
const putCategory = (payload) => ({
  type: CATEGORY_EDIT,
  payload: payload,
}); //action
export const editCategory = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/categories/${data.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();
      if (payload.message) {
        dispatch(setCategoryError(payload.message));
      } else {
        dispatch(putCategory(payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(setCategoryError(err));
    } finally {
    }
  };
}; // middleware
//========================EDITProductEND====================================//
//========================DEELTEProduct====================================//
const destroyCategory = (payload) => ({
  type: CATEGORY_DELETE,
  payload,
});
export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();

      // dispatch(destroyCategory(payload));
      dispatch(fetchCategory());
    } catch (err) {
      console.log(err);
    }
  };
};
//========================DEELTEProductEND====================================//
const setImage = (payload) => ({
  type: SET_IMAGES,
  payload: payload,
});
const setImageoading = (payload) => ({
  type: SET_IMAGES_LOADING,
  payload: payload,
});
const setImageError = () => ({
  type: SET_IMAGES_ERROR,
});
export const fetchImage = (id) => {
  return async (dispatch) => {
    dispatch(setImageoading(true));
    try {
      const response = await fetch(`${API_URL}/images/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const payload = await response.json();
      if (payload.message) {
        dispatch(setImageError(payload.message));
      } else {
        dispatch(setImage(payload));
      }
      //   setProduct(payload);
    } catch (err) {
      console.log(err);
      dispatch(setImageError(err));
    } finally {
      dispatch(setImageoading(false));
    }
  };
};
