import {
  CART_ADD,
  CART_ERROR,
  CART_FETCH,
  CART_LOADING,
  CART_REMOVE
} from '../actions/types';
import {
  setLocalCart,
  getLocalCart,
  removeLocalCart,
  baseUrl
} from '../../utils';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success_flag: false,
  error_flag: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      setLocalCart(action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success_flag: true,
        error_flag: false
      };

    case CART_ERROR:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
        success_flag: false,
        error_flag: true
      };

    case CART_FETCH:
      setLocalCart(action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success_flag: false,
        error_flag: false
      };
    case CART_LOADING:
      return {
        data: null,
        loading: true,
        error: null,
        success_flag: false,
        error_flag: false
      };
    case CART_REMOVE:
      setLocalCart([]);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        success_flag: true,
        error_flag: false
      };

    default:
      return state;
  }
};
