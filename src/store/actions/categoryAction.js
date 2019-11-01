/* eslint-disable */
import {
  CATEGORY_FETCH,
  CATEGORY_ERROR,
  CATEGORY_LOADING,
  CATEGORIES_FETCH,
  CATEGORIES_LOADING,
  CATEGORIES_ERROR
} from './types';
import Strapi from 'strapi-sdk-javascript/build/main';
import { baseUrl } from '../../utils';
const strapi = new Strapi(baseUrl);

const act_fetch_category = () => async dispatch => {
  dispatch({ type: CATEGORIES_LOADING });

  try {
    await strapi
      .axios(`categories`)
      .then(res => {
        dispatch({ type: CATEGORIES_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: CATEGORIES_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: CATEGORIES_ERROR, payload: String(error) });
  }
};

const act_fetch_a_category = category => async dispatch => {
  dispatch({ type: CATEGORY_LOADING });

  try {
    await strapi
      .axios(`categories/${category}`)
      .then(res => {
        dispatch({ type: CATEGORY_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: CATEGORY_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: CATEGORY_ERROR, payload: String(error) });
  }
};

export { act_fetch_category, act_fetch_a_category };
