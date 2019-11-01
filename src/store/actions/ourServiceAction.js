/* eslint-disable */
import {
  SERVICE_FETCH,
  SERVICE_ERROR,
  SERVICE_LOADING,
  TESTMONY_LOADING,
  TESTMONY_FETCH,
  TESTMONY_ERROR
} from './types';
import Strapi from 'strapi-sdk-javascript/build/main';
import { baseUrl } from '../../utils';
const strapi = new Strapi(baseUrl);

const act_fetch_service = () => async dispatch => {
  dispatch({ type: SERVICE_LOADING });

  try {
    await strapi
      .axios(`services`)
      .then(res => {
        dispatch({ type: SERVICE_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: SERVICE_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: SERVICE_ERROR, payload: String(error) });
  }
};

const act_fetch_testmony = () => async dispatch => {
  dispatch({ type: TESTMONY_LOADING });

  try {
    await strapi
      .axios(`testimonies`)
      .then(res => {
        dispatch({ type: TESTMONY_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: TESTMONY_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: TESTMONY_ERROR, payload: String(error) });
  }
};

export { act_fetch_service, act_fetch_testmony };
