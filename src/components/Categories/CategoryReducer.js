import {
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  REMOVE_CATEGORY_BEGIN,
  REMOVE_CATEGORY_SUCESS,
  REMOVE_CATEGORY_ERROR,
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  SET_CURRENT_CATEGORY
} from "./Constants";

const initialState = {
  categories: [],
  currentCategory: {},
  isLoading: true,
  deleteProgress: []
};

const CategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CATEGORY_BEGIN:
      return { ...state, isLoading: true };
    case ADD_CATEGORY_SUCCESS:
      return { ...state, isLoading: false };
    case ADD_CATEGORY_ERROR:
      return { ...state, isLoading: false };
    case REMOVE_CATEGORY_BEGIN:
      const deleteProgressArr = [...state.deleteProgress, payload];
      return { ...state, deleteProgress: deleteProgressArr };
    case REMOVE_CATEGORY_SUCESS:
    case REMOVE_CATEGORY_ERROR:
      const deleteProgress = [...state.deleteProgress];
      const index = deleteProgress.indexOf(payload);
      if (index >= 0) {
        deleteProgress.splice(index, 1);
      }
      return { ...state, deleteProgress };
    case FETCH_CATEGORIES_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case FETCH_CATEGORIES_ERROR:
      return { ...state, isLoading: false };
    case SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: payload };
    default:
      return state;
  }
};

export default CategoryReducer;
