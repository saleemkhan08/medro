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

export const setCurrentCategory = category => ({
  type: SET_CURRENT_CATEGORY,
  payload: category
});

export function addCategory(name) {
  console.log("###################### actions addCategory : ", name);
  return dispatch => {
    dispatch(addCategoryBegin());
    database
      .ref()
      .child(CATEGORIES)
      .push(name)
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
        const uids = Object.keys(categories);
        uids.forEach(key => {
          const category = categories[key];
          categoryList.push({ category, key });
        });
        dispatch(fetchCategoriesSuccess(categoryList));
        dispatch(setCurrentCategory(categoryList[0]));
      } else {
        dispatch(fetchCategoriesError());
      }
    });
  };
}

export function removeCategory(key) {
  return dispatch => {
    dispatch(removeCategoryBegin());
    const query = database
      .ref()
      .child(CATEGORIES)
      .child(key);
    query
      .remove()
      .then(() => {
        dispatch(removeCategorySuccess());
      })
      .catch(() => {
        dispatch(removeCategoryError());
      });
  };
}

export const removeCategoryBegin = () => ({
  type: REMOVE_CATEGORY_BEGIN
});

export const removeCategorySuccess = () => ({
  type: REMOVE_CATEGORY_SUCESS
});

export const removeCategoryError = () => ({
  type: REMOVE_CATEGORY_ERROR
});
