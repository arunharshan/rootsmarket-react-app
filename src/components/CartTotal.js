/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToastMessage from '../components/ToastMessage';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import {
  act_fetch_cart,
  act_update_cart,
  act_remove_cart,
  act_add_cart
} from '../store/actions/cartAction';

const CartTotal = ({ promo, shipping, finalAount }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [orderTotal, setOrderTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [ship, setShip] = useState(0);
  let price,
    percentage,
    subAmt = 0;
  useEffect(() => {
    setShip(parseInt(shipping));
  }, [shipping]);
  useEffect(() => {
    const loadCart = async () => {
      await dispatch(act_fetch_cart());
    };
    loadCart();
  }, []);

  useEffect(() => {
    try {
      if (cart.data != 'undefined' && cart.data != null) {
        price = cart.data.map(res => {
          return res.total;
        });
        subAmt = price.reduce((total, res) => {
          total += parseFloat(res);
          return total;
        }, 0);
        percentage = (100 * subAmt) / 2000;
        percentage = isNaN(percentage) ? 0 : percentage;
        subAmt = isNaN(subAmt) ? 0 : subAmt;

        setSubTotal(subAmt);
        setOrderTotal(subAmt + percentage + ship);
        setTax(percentage);
        finalAount((subAmt + percentage + ship).toFixed(2));
      } else {
        setSubTotal(0);
        setOrderTotal(0);
        setTax(0);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [cart, percentage, ship]);

  return (
    <div className='card no-border p-3'>
      <div className=' d-flex justify-content-between align-items-center'>
        <span>Subtotal:</span>
        <span>
          $
          {subTotal ? subTotal.toFixed(2) : '-- . --'
          // <Spinner animation='grow' variant='success' size='sm' />
          }
        </span>
      </div>
      <div className='mt-2  d-flex justify-content-between align-items-center'>
        <span>Shipping:</span>$
        {ship ? ship.toFixed(2) : ship == 0 ? '0.00' : '--.--'}
      </div>
      <div className='mt-2  d-flex justify-content-between align-items-center'>
        <span>Tax(2%):</span>
        <span>
          $
          {tax ? tax.toFixed(2) : '-- . --'
          // <Spinner animation='grow' variant='success' size='sm' />
          }
        </span>
      </div>
      <hr />
      <div className='d-flex justify-content-between align-items-center bold'>
        <span>Order Total:</span>
        <span>
          $
          {orderTotal ? orderTotal.toFixed(2) : '-- . --'
          // <Spinner animation='grow' variant='success' size='sm' />
          }
        </span>
      </div>
    </div>
  );
};
CartTotal.defaultProps = {
  promo: 'offer',
  shipping: 0
};

CartTotal.propTypes = {
  promo: PropTypes.string
};
export default CartTotal;
