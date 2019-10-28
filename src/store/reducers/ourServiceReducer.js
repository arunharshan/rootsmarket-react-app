import {
  SERVICE_FETCH,
  SERVICE_ERROR,
  SERVICE_LOADING,
  TESTMONY_LOADING,
  TESTMONY_FETCH,
  TESTMONY_ERROR
} from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export const services = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SERVICE_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};

export const testimony = (state = initialState, action) => {
  switch (action.type) {
    case TESTMONY_FETCH:
      return {
        data: action.payload,
        loading: false,
        error: null
      };
    case TESTMONY_ERROR:
      return {
        loading: false,
        error: action.payload
      };
    case TESTMONY_LOADING:
      return {
        loading: true,
        error: false
      };
    default:
      return state;
  }
};
