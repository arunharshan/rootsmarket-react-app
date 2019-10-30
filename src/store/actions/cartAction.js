import Strapi from 'strapi-sdk-javascript/build/main';
import {
  CART_ADD,
  CART_REMOVE,
  CART_ERROR,
  CART_UPDATE,
  CART_FETCH,
  CART_LOADING
} from './types';

import {
  setLocalCart,
  getLocalCart,
  removeLocalCart,
  baseUrl,
  getAuth
} from '../../utils';

const strapi = new Strapi(baseUrl);

const act_add_cart = data => async dispatch => {
  dispatch({ type: CART_LOADING });
  const customer_id = getAuth() ? getAuth().user._id : null;
  setLocalCart(data);

  const userCartbyId = await strapi.axios.get(
    `carts?customer_id=${customer_id}`
  );
  if (customer_id) {
    if (userCartbyId.data.length > 0) {
      const deleteUserCart = await strapi.axios.put(
        `carts/${userCartbyId.data[0].id}`,
        { cart: [] }
      );
      // const deleteUserCart = await strapi.axios.delete(
      //   `carts/${userCartbyId.data[0].id}`
      // );
    }
    try {
      await strapi.axios
        .put(`carts/${userCartbyId.data[0].id}`, {
          cart: getLocalCart(),
          customer_id: customer_id
        })
        // .post(`carts`, { cart: getLocalCart(), customer_id: customer_id })
        .then(res => {
          if (res.data.cart.length > 0 || res.data.cart > 0) {
            dispatch({ type: CART_ADD, payload: res.data.cart });
          } else {
            dispatch({ type: CART_ADD, payload: getLocalCart() });
          }
        })
        .catch(error => {
          dispatch({ type: CART_ERROR, payload: String(error) });
        });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: String(error) });
    }
  } else {
    dispatch({ type: CART_ADD, payload: getLocalCart() });
  }
};

const act_fetch_cart = () => async dispatch => {
  const customer_id = getAuth() ? getAuth().user._id : null;
  dispatch({ type: CART_LOADING });
  if (customer_id) {
    try {
      await strapi.axios
        .get(`carts?customer_id=${customer_id}`)
        .then(res => {
          // was >= 0 || res.data[0].cart.length >= 0
          if (res.data.length > 0) {
            if (getLocalCart().length > 0) {
              var lo = getLocalCart();
              var db = res.data[0].cart;
              var db_lo = lo.concat(db);
              // remove duplicat values from merged cart
              db_lo = db_lo.filter((obj, pos, arr) => {
                return (
                  arr
                    .map(mapObj => mapObj['product_id'])
                    .indexOf(obj['product_id']) === pos
                );
              });

              dispatch({ type: CART_FETCH, payload: db_lo });
            } else {
              dispatch({ type: CART_FETCH, payload: res.data[0].cart });
            }
          } else {
            dispatch({ type: CART_FETCH, payload: getLocalCart() });
          }
        })
        .catch(error => {
          dispatch({ type: CART_ERROR, payload: String(error) });
        });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: String(error) });
    }
  } else {
    dispatch({ type: CART_FETCH, payload: getLocalCart() });
  }
};

const clear_cart = () => async dispatch => {
  const customer_id = getAuth() ? getAuth().user._id : null;
  try {
    const res = await strapi.axios.get(`carts?customer_id=${customer_id}`);
    if (res.status == 200) {
      await strapi.axios
        .put(`carts/${res.data[0]._id}`, { cart: [] })
        .then(res => {
          dispatch({ type: CART_REMOVE, payload: [] });
        })
        .catch(error => {
          dispatch({ type: CART_ERROR, payload: 'Unable to clear cart' });
        });
    }
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: 'Unable to clear cart' });
  }
};

export { act_fetch_cart, act_add_cart, clear_cart };
