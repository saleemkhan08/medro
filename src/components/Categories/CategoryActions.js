import { database } from "../../store";

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
  SET_CURRENT_CATEGORY,
  CATEGORIES
} from "./Constants";

import { fetchProducts } from "../Products/ProductActions";

export function setCurrentCategory(category) {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_CATEGORY,
      payload: category
    });
    console.log("setCurrentCategory:", category);
    dispatch(fetchProducts(category.id));
  };
}

export function addCategory(name) {
  return dispatch => {
    dispatch(addCategoryBegin());
    const newRef = database
      .ref()
      .child(CATEGORIES)
      .push();
    newRef
      .set({ name: name, id: newRef.key })
      .then(() => {
        dispatch(addCategorySuccess());
      })
      .catch(() => {
        dispatch(addCategoryError());
      });
  };
}
export const addCategoryBegin = () => ({
  type: ADD_CATEGORY_BEGIN
});

export const addCategorySuccess = () => ({
  type: ADD_CATEGORY_SUCCESS
});

export const addCategoryError = () => ({
  type: ADD_CATEGORY_ERROR
});

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});

export const fetchCategoriesError = () => ({
  type: FETCH_CATEGORIES_ERROR
});

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    const query = database.ref().child(CATEGORIES);
    query.on("value", querySnapshot => {
      const categories = querySnapshot.val();
      if (categories) {
        const categoryList = [];
        const categoryIds = Object.keys(categories);
        categoryIds.forEach(id => {
          const category = categories[id];
          categoryList.push(category);
        });
        dispatch(fetchCategoriesSuccess(categoryList));
        dispatch(setCurrentCategory(categoryList[0]));
      } else {
        dispatch(fetchCategoriesError());
      }
    });
  };
}

export function removeCategory(categoryId) {
  return dispatch => {
    dispatch(removeCategoryBegin(categoryId));
    const query = database
      .ref()
      .child(CATEGORIES)
      .child(categoryId);
    query
      .remove()
      .then(() => {
        dispatch(removeCategorySuccess(categoryId));
      })
      .catch(() => {
        dispatch(removeCategoryError(categoryId));
      });
  };
}

export const removeCategoryBegin = id => ({
  type: REMOVE_CATEGORY_BEGIN,
  payload: id
});

export const removeCategorySuccess = id => ({
  type: REMOVE_CATEGORY_SUCESS,
  payload: id
});

export const removeCategoryError = id => ({
  type: REMOVE_CATEGORY_ERROR,
  payload: id
});
