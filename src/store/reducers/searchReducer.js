/* eslint-disable */
import { FETCH_SEARCH, ERROR_MESSAGE, LOADING } from '../actions/types';
import { setAuth, removeAuth } from '../../utils';
const initialState = {
  search: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH:
      // setAuth(action.payload);
      return {
        ...state,
        search: action.payload,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
