import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import CategoryReducer from "./components/Categories/CategoryReducer";
import ProductReducer from "./components/Products/ProductReducer";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAAzstWb_q00rzlKRlls3ZcaAAdCm7NMNo",
  authDomain: "medro-2020.firebaseapp.com",
  databaseURL: "https://medro-2020.firebaseio.com",
  projectId: "medro-2020",
  storageBucket: "medro-2020.appspot.com",
  messagingSenderId: "778426666283"
};
firebase.initializeApp(firebaseConfig);

export const store = createStore(
  combineReducers({ CategoryReducer, ProductReducer }),
  applyMiddleware(thunk)
);
export const database = firebase.database();
export const storage = firebase.storage();
export const firebaseAuth = firebase.auth();
