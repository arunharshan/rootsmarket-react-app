import Strapi from 'strapi-sdk-javascript/build/main';
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
  ADDRESSBOOK_ERROR
} from './types';
import { baseUrl, getAuth } from '../../utils';
const _ = require('lodash');
const strapi = new Strapi(baseUrl);

const act_signin = user => async dispatch => {
  dispatch({ type: SIGN_IN_LOADING });
  const { email, password } = user;
  const identifier = email;
  try {
    await strapi
      .login(identifier, password)
      .then(res => {
        dispatch({ type: SIGN_IN, payload: res });
      })
      .catch(error => {
        dispatch({ type: SIGN_IN_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: SIGN_IN_ERROR, payload: String(error) });
  }
};

const act_signup = user => async dispatch => {
  dispatch({ type: SIGN_UP_LOADING });
  const { email, password } = user;
  const username = new Date();
  try {
    await strapi
      .register(username, email, password)
      .then(res => {
        dispatch({ type: SIGN_UP, payload: res });
      })
      .catch(error => {
        dispatch({ type: SIGN_UP_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: SIGN_UP_ERROR, payload: String(error) });
  }
};

const act_set_address = data => async dispatch => {
  try {
    const res = await strapi.axios.get(`addressbooks?user_id=${data.user_id}`);
    if (res.data) {
      if (typeof res.data[0] !== 'undefined') {
        await strapi.axios
          .put(`addressbooks/${res.data[0]._id}`, {
            name: _.upperFirst(_.toLower(data.name)),
            address: _.upperFirst(_.toLower(data.address)),
            city: _.upperFirst(_.toLower(data.city)),
            zipcode: data.zipcode,
            user_id: data.user_id,
            state: data.state
          })
          .then(res => {
            dispatch({ type: ADDRESSBOOK_SET, payload: res.data });
          })
          .catch(error => {
            dispatch({ type: ADDRESSBOOK_ERROR, payload: String(error) });
          });
      } else {
        await strapi.axios
          .post(`addressbooks`, {
            name: _.upperFirst(_.toLower(data.name)),
            address: _.upperFirst(_.toLower(data.address)),
            city: _.upperFirst(_.toLower(data.city)),
            zipcode: data.zipcode,
            user_id: data.user_id,
            state: data.state
          })
          .then(res => {
            dispatch({ type: ADDRESSBOOK_SET, payload: res.data });
          })
          .catch(error => {
            dispatch({ type: ADDRESSBOOK_ERROR, payload: String(error) });
          });
      }
    }
  } catch (error) {
    dispatch({ type: ADDRESSBOOK_ERROR, payload: String(error) });
  }
};

const act_fetch_address = () => async dispatch => {
  try {
    const res = await strapi.axios.get(
      `addressbooks?user_id=${getAuth().user._id}`
    );

    if (typeof res.data[0] !== 'undefined') {
      dispatch({ type: ADDRESSBOOK, payload: res.data[0] });
    } else {
      dispatch({ type: ADDRESSBOOK_ERROR, payload: 'No AddressBook Found' });
    }
  } catch (error) {
    dispatch({ type: ADDRESSBOOK_ERROR, payload: String(error) });
  }
};

const act_signout = () => dispatch => {
  dispatch({ type: SIGN_OUT });
};

export {
  act_signin,
  act_signup,
  act_signout,
  act_set_address,
  act_fetch_address
};
