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
  SET_CURRENT_PRODUCT_TO_EDIT
} from "./Constants";

const initialState = {
  products: [],
  currentProduct: undefined,
  isLoading: true,
  deleteProgress: []
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
      const deleteProgressArr = [...state.deleteProgress, payload];
      return { ...state, deleteProgress: deleteProgressArr };
    case REMOVE_PRODUCT_SUCESS:
    case REMOVE_PRODUCT_ERROR:
      const deleteProgress = [...state.deleteProgress];
      const index = deleteProgress.indexOf(payload);
      if (index >= 0) {
        deleteProgress.splice(index, 1);
      }
      return { ...state, deleteProgress };
    case FETCH_PRODUCTS_BEGIN:
      return { ...state, isLoading: true, products: [] };
    case FETCH_PRODUCTS_SUCCESS:
      let currentProduct = { ...state.currentProduct };
      if (currentProduct.id) {
        payload.forEach(product => {
          if (product.id === currentProduct.id) {
            currentProduct = { ...product };
          }
        });
      }
      return { ...state, isLoading: false, products: payload, currentProduct };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, isLoading: false };
    case SET_CURRENT_PRODUCT_TO_EDIT:
      return { ...state, currentProduct: payload };
    default:
      return state;
  }
};

export default ProductReducer;
