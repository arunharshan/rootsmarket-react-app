/* eslint-disable */
import {
  FEATURED_FETCH,
  FEATURED_ERROR,
  FEATURED_LOADING,
  PRODUCTS_FETCH,
  PRODUCTS_ERROR,
  PRODUCTS_LOADING,
  PRODUCT_FETCH,
  PRODUCT_ERROR,
  PRODUCT_LOADING
} from '../actions/types';
const initialState = {
  //featured: null,
  // loading: false,
  // error: null,

  //products: null,
  // loading: false,
  // error: null,

  //product: null,
  // loading: false,
  // error: null
  data: null,
  error: null,
  loading: false
};

export const featured = (state = initialState, action) => {
  switch (action.type) {
    case FEATURED_FETCH:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case FEATURED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FEATURED_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};

export const product = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};
