import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Col, Container, Row, Tabs, Tab, Spinner } from 'react-bootstrap';

import PropTypes from 'prop-types';

import Quantity from '../components/Quantity';
import TooltipHoc from '../components/TooltipHoc';

import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';

import ToastMessage from '../components/ToastMessage';

import { act_fetch_a_product } from '../store/actions/productsAction';

import {
  act_fetch_cart,
  act_update_cart,
  act_remove_cart,
  act_add_cart
} from '../store/actions/cartAction';

const Cart = ({ cartsize }) => {
  const history = useHistory();
  const { product } = useSelector(state => state);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(null);

  const [miniCart, setMiniCart] = useState(cartsize == 'small' ? true : false);

  useEffect(() => {
    const loadCart = async () => {
      await dispatch(act_fetch_cart());
    };
    loadCart();
  }, []);

  let getProductIds = null;
  // eg: ['id1', 'id2', ....]
  try {
    getProductIds =
      cart.data &&
      cart.data.map(res => {
        return res.product_id;
      });
  } catch (error) {
    console.log(error);
  }
  // console.log('getProductIds', getProductIds);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(act_fetch_a_product(getProductIds));
    };
    if (getProductIds) {
      if (getProductIds.length > 0) {
        loadData();
        // console.log(cart);
      }
    }
  }, [cart, itemCount]);

  let result = null;
  if (typeof product.data !== 'undefined') {
    result = product.data;
  }

  useEffect(() => {
    try {
      if (cart.data) {
        let ct = cart.data.reduce((val, res) => {
          val += parseFloat(res.qty);
          return val;
        }, 0);
        setItemCount(ct);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cart]);
  // console.log(itemCount);

  const IsDbRunning = () => {
    // or check the status code.
    if (product.error == 'Error: Network Error') {
      return (
        <ToastMessage
          text={`Looks like the we have lost the Data base connection. ${product.error} `}
          autohide={false}
          type='error'
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className={`${!miniCart && 'checkout pt-6 pb-5'}`}>
      <div className={`${!miniCart && 'container'}`}>
        <IsDbRunning />
        <div className={`row ${miniCart && 'hide'}`}>
          <h4 className='mt-5 pl-3'>
            Cart Items (
            {itemCount !== null && !isNaN(itemCount) ? itemCount : 0
            // <Spinner animation='grow' variant='danger' size='md' />
            }
            )
          </h4>
        </div>
        <div className='row justify-content-md-center'>
          <div className={`col-md-4 mt-5 order-md-2 ${miniCart && 'hide'}`}>
            <CartTotal promo='offer' shipping='0' />
            <button
              className='btn btn-success mt-3 w-100'
              onClick={() => history.push('/checkout')}
              disabled={product.error || itemCount <= 0}
            >
              Proceed to Checkout
            </button>
          </div>
          <div
            className={` ${
              miniCart ? 'col-md-12' : 'col-md-8 mt-5 order-md-1 '
            }`}
          >
            {result && itemCount ? (
              result.map(res => {
                return (
                  <CartItem
                    key={res.id}
                    values={res}
                    deleteBtn={true}
                    size={cartsize}
                    buttonText='Update'
                  />
                );
              })
            ) : product.error ? (
              <Col xs={12}>
                <div
                  className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
                  role='alert'
                >
                  {product.error ? product.error : 'Loading..'}
                </div>
              </Col>
            ) : (
              <Col xs={12}>
                <div
                  className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
                  role='alert'
                >
                  Your Cart is Empty!
                </div>
              </Col>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
Cart.defaultProps = {
  cartsize: 'default'
};

Cart.propTypes = {
  cartsize: PropTypes.string
};
export default Cart;
