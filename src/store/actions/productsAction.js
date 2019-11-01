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
} from './types';

import Strapi from 'strapi-sdk-javascript/build/main';
import { baseUrl } from '../../utils';
const strapi = new Strapi(baseUrl);
const act_fetch_all_products = () => async dispatch => {
  dispatch({ type: PRODUCTS_LOADING });

  try {
    await strapi
      .axios('products')
      .then(res => {
        dispatch({ type: PRODUCTS_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: PRODUCTS_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: PRODUCTS_ERROR, payload: String(error) });
  }
};

// ?id_in=3&id_in=6&id_in=8

// const act_fetch_a_product = product => async dispatch => {
//   dispatch({ type: PRODUCT_LOADING });

//   try {
//     await strapi
//       .axios(`products/${product}`)
//       .then(res => {
//         dispatch({ type: PRODUCT_FETCH, payload: res.data });
//       })
//       .catch(error => {
//         dispatch({ type: PRODUCT_ERROR, payload: String(error) });
//       });
//   } catch (error) {
//     dispatch({ type: PRODUCT_ERROR, payload: String(error) });
//   }
// };

const act_fetch_a_product = product => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  let id;
  if (Array.isArray(product)) {
    id = product.map(res => {
      return `_id=${res}&`;
    });
    id = id.join('');
  } else {
    id = `_id=${product}`;
  }

  try {
    await strapi
      .axios(`products?${id}`)
      .then(res => {
        dispatch({ type: PRODUCT_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: PRODUCT_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: String(error) });
  }
};

const act_fetch_featured_products = () => async dispatch => {
  dispatch({ type: FEATURED_LOADING });

  try {
    await strapi
      .axios(`products?featured=true`)
      .then(res => {
        dispatch({ type: FEATURED_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: FEATURED_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: FEATURED_ERROR, payload: String(error) });
  }
};

const act_fetch_category_product = category => async dispatch => {
  dispatch({ type: FEATURED_LOADING });

  try {
    await strapi
      .axios(`products?featured=true`)
      .then(res => {
        dispatch({ type: FEATURED_FETCH, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: FEATURED_ERROR, payload: String(error) });
      });
  } catch (error) {
    dispatch({ type: FEATURED_ERROR, payload: String(error) });
  }
};

export {
  act_fetch_all_products,
  act_fetch_a_product,
  act_fetch_featured_products,
  act_fetch_category_product
};
