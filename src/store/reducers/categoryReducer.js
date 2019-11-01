/* eslint-disable */
import {
  CATEGORY_FETCH,
  CATEGORY_ERROR,
  CATEGORY_LOADING,
  CATEGORIES_FETCH,
  CATEGORIES_LOADING,
  CATEGORIES_ERROR
} from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};
