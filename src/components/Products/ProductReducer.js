import {
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_SUCESS,
  REMOVE_PRODUCT_ERROR,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  SET_CURRENT_PRODUCT_TO_EDIT,
  SET_CURRENT_PRODUCT_TO_VIEW
} from "./Constants";

const initialState = {
  products: [],
  currentProductToEdit: undefined,
  currentProductToView: undefined,
  isLoading: true
};

const ProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT_BEGIN:
      return { ...state, isLoading: true };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, isLoading: false };
    case ADD_PRODUCT_ERROR:
      return { ...state, isLoading: false };
    case UPDATE_PRODUCT_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false };
    case UPDATE_PRODUCT_ERROR:
      return { ...state, isLoading: false };
    case REMOVE_PRODUCT_BEGIN:
      return { ...state, isLoading: true };
    case REMOVE_PRODUCT_SUCESS:
      return { ...state, isLoading: false };
    case REMOVE_PRODUCT_ERROR:
      return { ...state, isLoading: false };
    case FETCH_PRODUCTS_BEGIN:
      return { ...state, isLoading: true, products: [] };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, products: payload };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, isLoading: false };
    case SET_CURRENT_PRODUCT_TO_EDIT:
      return { ...state, currentProductToEdit: payload };
    case SET_CURRENT_PRODUCT_TO_VIEW:
      return { ...state, currentProductToView: payload };
    default:
      return state;
  }
};

export default ProductReducer;
