/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Quantity from '../components/Quantity';
import { Spinner, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ToastMessage from '../components/ToastMessage';
import { act_fetch_cart, act_add_cart } from '../store/actions/cartAction';
const AddToCart = ({
  id,
  prevQty,
  size,
  isDisable,
  price,
  showDeleteBtn,
  buttonText
}) => {
  const [totalPrice, setTotalPrice] = useState(price * prevQty);
  const [cartFlag, setCartFlag] = useState({
    flag: false,
    message: null,
    type: 'success',
    autohide: false
  });
  const [tempCart, setTempCart] = useState([]);
  const [newQty, setNewQty] = useState(prevQty);
  const [hasInCart, setHasInCart] = useState(null);

  const [small, setSmall] = useState(size == 'small' ? true : false);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    const loadCart = async () => {
      await dispatch(act_fetch_cart());
    };
    loadCart();
  }, []);

  const nextQtyHandler = qty => {
    setCartFlag({ flag: false });
    setTotalPrice((price * qty).toFixed(2));
    setNewQty(qty);
    setTempCart(values => ({
      ...values,
      qty,
      product_id: id,
      total: (price * qty).toFixed(2)
    }));
  };

  const submitHandler = () => {
    setCartFlag({ flag: false });
    setTempCart(values => ({
      ...values,
      qty: newQty,
      product_id: id,
      total: totalPrice
    }));

    try {
      if (cart.data !== 'undefined' && cart.data !== null) {
        let filteredCart = cart.data.filter(res => {
          return res.product_id !== tempCart.product_id;
        });
        filteredCart.push(tempCart);
        dispatch(act_add_cart(filteredCart));
      } else {
        dispatch(act_add_cart(tempCart));
      }
    } catch (error) {
      console.log(error);

      setCartFlag({
        flag: true,
        message: 'Internal error occured',
        type: 'error',
        autohide: false
      });
    }
  };

  let hasCart = null;

  useEffect(() => {
    setCartFlag({ flag: false });
    try {
      if (cart.data) {
        hasCart =
          id && cart.data
            ? cart.data.find(res => {
                return res.product_id == id;
              })
            : null;
      }
    } catch (error) {
      console.log(error);
      setCartFlag({
        flag: true,
        message: 'Internal error occured',
        type: 'danger',
        autohide: false
      });
    }
    setHasInCart(hasCart);
  }, [cart]);

  const removeHandler = () => {
    let filteredCart =
      cart.data &&
      cart.data.filter(res => {
        return res.product_id !== id;
      });
    dispatch(act_add_cart(filteredCart));
  };

  // console.log('<AddToCart/>', cart);
  return (
    <>
      {cart.loading && (
        <Spinner animation='border' variant='success' size='lg' />
      )}
      {cartFlag.flag && (
        <ToastMessage
          text={cartFlag.message}
          autohide={cartFlag.autohide}
          type={cartFlag.type}
        />
      )}
      {(cart.success_flag || cart.error_flag) && (
        <ToastMessage
          text={cart.success_flag ? ' Cart is updated' : cart.error}
          autohide={true}
          type={cart.success_flag ? 'success' : 'danger'}
        />
      )}
      <div className={`row mb-3 ${small && 'hide'}`}>
        <div className='d-flex ml-3'>
          <Quantity
            oldQty={hasInCart ? hasInCart.qty : prevQty}
            newQty={nextQtyHandler}
          />
        </div>
        <div className='col-6-'>
          <button
            type='button'
            className={`btn btn-success btn-lg ml-2`}
            onClick={submitHandler}
            disabled={isDisable}
          >
            {false ? (
              <>
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                Adding to cart...
              </>
            ) : !isDisable ? (
              buttonText
            ) : (
              'Not in Stock'
            )}
          </button>
          {showDeleteBtn && !small && (
            <>
              <span
                className='text-secondary mt-2 text-right cursor-pointer ml-2'
                onClick={removeHandler}
              >
                <small>
                  <i className='fas fa-trash-alt mr-1'></i> Remove
                </small>
              </span>
            </>
          )}
        </div>
      </div>
      <p>
        Sub Total is ${totalPrice} for {hasInCart ? hasInCart.qty : prevQty}{' '}
        item
      </p>
    </>
  );
};
AddToCart.defaultProps = {
  size: 'default',
  updatedQty: 1,
  prevQty: 1,
  showDeleteBtn: false,
  buttonText: 'Add to Cart'
};

AddToCart.propTypes = {
  size: PropTypes.string,
  buttonText: PropTypes.string
};

export default AddToCart;
