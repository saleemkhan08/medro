import { database, storage } from "../../store";

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
  PRODUCTS
} from "./Constants";

export const setCurrentProductToEdit = product => ({
  type: SET_CURRENT_PRODUCT_TO_EDIT,
  payload: product
});

export function addProduct(product) {
  return dispatch => {
    dispatch(addProductBegin());
    const newRef = database
      .ref()
      .child(PRODUCTS)
      .child(product.categoryId)
      .push();
    product["id"] = newRef.key;
    newRef
      .set(product)
      .then(() => {
        dispatch(addProductSuccess());
      })
      .catch(() => {
        dispatch(addProductError());
      });
  };
}

export function uploadImage(currentProduct, url, id) {
  return dispatch => {
    database
      .ref()
      .child(PRODUCTS)
      .child(currentProduct.categoryId)
      .child(currentProduct.id)
      .child("images")
      .child(id)
      .set(url);
  };
}
export function deleteImage(currentProduct, imgName) {
  return dispatch => {
    database
      .ref()
      .child(PRODUCTS)
      .child(currentProduct.categoryId)
      .child(currentProduct.id)
      .child("images")
      .child(imgName)
      .remove()
      .then(() => {
        storage
          .ref()
          .child("images")
          .child(currentProduct.id)
          .child(imgName)
          .delete();
      });
  };
}

export function updateProduct(product) {
  return dispatch => {
    dispatch(updateProductBegin());
    database
      .ref()
      .child(PRODUCTS)
      .child(product.categoryId)
      .child(product.id)
      .set(product)
      .then(() => {
        dispatch(updateProductSuccess());
      })
      .catch(() => {
        dispatch(updateProductError());
      });
  };
}
export const addProductBegin = () => ({
  type: ADD_PRODUCT_BEGIN
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS
});

export const addProductError = () => ({
  type: ADD_PRODUCT_ERROR
});

export const updateProductBegin = () => ({
  type: UPDATE_PRODUCT_BEGIN
});

export const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS
});

export const updateProductError = () => ({
  type: UPDATE_PRODUCT_ERROR
});

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchProductsError = () => ({
  type: FETCH_PRODUCTS_ERROR
});

export function fetchProducts(categoryId) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    const query = database
      .ref()
      .child(PRODUCTS)
      .child(categoryId);

    query.on("value", querySnapshot => {
      const products = querySnapshot.val();
      if (products) {
        const productList = [];
        const productIds = Object.keys(products);
        productIds.forEach(productId => {
          productList.push(products[productId]);
        });
        dispatch(fetchProductsSuccess(productList));
      } else {
        dispatch(fetchProductsError());
      }
    });
  };
}

export function removeProduct(product) {
  return dispatch => {
    dispatch(removeProductBegin(product.id));
    const query = database
      .ref()
      .child(PRODUCTS)
      .child(product.categoryId)
      .child(product.id);
    query
      .remove()
      .then(() => {
        dispatch(removeProductSuccess(product.id));
      })
      .catch(() => {
        dispatch(removeProductError(product.id));
      });
  };
}

export const removeProductBegin = id => ({
  type: REMOVE_PRODUCT_BEGIN,
  payload: id
});

export const removeProductSuccess = id => ({
  type: REMOVE_PRODUCT_SUCESS,
  payload: id
});

export const removeProductError = id => ({
  type: REMOVE_PRODUCT_ERROR,
  payload: id
});
