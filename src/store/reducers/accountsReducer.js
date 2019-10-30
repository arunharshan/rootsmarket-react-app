import {
  SIGN_UP,
  SIGN_UP_LOADING,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_LOADING,
  SIGN_IN_ERROR,
  SIGN_OUT,
  ADDRESSBOOK,
  ADDRESSBOOK_SET,
  ADDRESSBOOK_ERROR,
  JWT_AUTH
} from '../actions/types';

import { setAuth, removeAuth, getAuth } from '../../utils';

const initialState = {
  signin: null,
  signin_loading: false,
  signin_error: null,
  signup: null,
  signup_loading: false,
  signup_error: null,
  signout: false,
  jwt_auth: null,
  address: {
    address: null,
    address_flag: false,
    address_error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      setAuth(action.payload); // or by default stpapi sets jwt token
      return {
        signin: action.payload,
        jwt_auth: true,
        signin_loading: false,
        signin_error: null
      };
    case SIGN_IN_ERROR:
      removeAuth();
      return {
        signin_loading: false,
        jwt_auth: false,
        signin_error: action.payload
      };
    case SIGN_IN_LOADING:
      return {
        signin_loading: true,
        signin_error: null
      };
    case SIGN_UP:
      setAuth(action.payload); // or by default stpapi sets jwt token
      return {
        signup: action.payload,
        jwt_auth: true,
        signup_loading: false,
        signup_error: null
      };
    case SIGN_UP_ERROR:
      removeAuth();
      return {
        signin: null,
        jwt_auth: false,
        signup_loading: false,
        signup_error: action.payload
      };
    case SIGN_UP_LOADING:
      return {
        signup_loading: true,
        signup_error: null
      };
    case SIGN_OUT:
      removeAuth();
      return {
        signout: true
      };
    case JWT_AUTH:
      return {
        ...state,
        jwt_auth: action.payload
      };
    case ADDRESSBOOK:
      return {
        ...state,
        address: {
          address: action.payload,
          address_flag: false,
          address_error: null
        }
      };
    case ADDRESSBOOK_SET:
      return {
        ...state,
        address: {
          address: action.payload,
          address_flag: true,
          address_error: null
        }
      };
    case ADDRESSBOOK_ERROR:
      return {
        ...state,
        address: {
          address: null,
          address_flag: false,
          address_error: action.payload
        }
      };
    default:
      return state;
  }
};
