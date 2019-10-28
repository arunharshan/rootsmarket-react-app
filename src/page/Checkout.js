import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Spinner, Form } from 'react-bootstrap';

import ToastMessage from '../components/ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
import Address from '../components/accounts/Address';
import CartTotal from '../components/CartTotal';
import Cart from './Cart';
import StripePayment from '../components/accounts/StripePayment';
import $ from 'jquery';
import { baseUrl, getAuth, baseUrlApp } from '../utils';
import {
  act_set_address,
  act_fetch_address
} from '../store/actions/accountsAction';
import { delete_cart } from '../store/actions/cartAction';
const strapi = new Strapi(baseUrl);

const Checkout = () => {
  const history = useHistory();
  if (getAuth() == null) {
    history.push('/sign-in');
  }
  const auths = getAuth() ? getAuth().user : null;
  const [stripeToken, setStripeToken] = useState(null);
  const [validated, setValidated] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ show: false });
  const [hasCart, setHasCart] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const addressbook = useSelector(state => state.auth.address);
  const { product } = useSelector(state => state);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    dispatch(act_fetch_address());
  }, []);

  useEffect(() => {
    setUserInfo({
      user_id: auths ? auths._id : null,
      email: auths ? auths.email : null,
      purchase_date: new Date(Date.now()),
      cart: [{}],
      amount: null,
      token: null
    });
    if (addressbook && addressbook.address !== null) {
      const address = addressbook.address;
      setUserInfo(values => ({
        ...values,
        name: address.name ? address.name : null,
        address: address.address ? address.address : null,
        zipcode: address.zipcode ? address.zipcode : null,
        city: address.city ? address.city : null,
        state: address.state ? address.state : null
      }));
      setSelectedState(address.state ? address.state : null);
    }
  }, [addressbook]);

  const getStripeToken = value => {
    setStripeToken(value);
    setUserInfo(values => ({
      ...values,
      token: value
    }));
  };
  useEffect(() => {
    let lg = false;
    if (cart.data) {
      if (cart.data.length > 0) {
        lg = true;
      } else {
        lg = false;
      }

      setUserInfo(values => ({
        ...values,
        cart: cart.data
      }));
    }
    setHasCart(lg);
  }, [cart]);

  const getFinalAmount = amt => {
    setUserInfo(values => ({
      ...values,
      amount: amt
    }));
  };

  useEffect(() => {
    if (userInfo.token) {
      setHasToken(false);
      // call the backend api dispatch from here...
    }
  }, [userInfo.token, stripeToken]);

  const onChangeHandler = e => {
    e.persist();
    if (e.target.name == 'state') {
      setSelectedState(e.target.value);
    }
    if (e.target.name == 'shipping') {
      setShippingCost(e.target.value);
    }

    setUserInfo(value => ({
      ...value,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ show: false });

    const form = e.currentTarget;
    !stripeToken && setHasToken(true);
    if (form.checkValidity() && stripeToken && userInfo.user_id) {
      try {
        // update or add address

        dispatch(act_set_address(userInfo));

        // store data into the Order database and sent data to Straip payment (orders controller)
        const res = await strapi.createEntry('Orders', userInfo);

        if (res._id) {
          setMessage({
            show: true,
            text: `Your order has been placed!. We have sent you an email confirmation. Order number is #${res._id}`,
            type: 'success',
            id: res._id
          });
          sendEmail(res._id); // send email
          setTimeout(function() {
            history.push(`/thank-you/${userInfo.name}/${res._id}`);
          }, 2000);
          dispatch(delete_cart()); // delete local and database cart
        } else {
          setMessage({
            show: true,
            text: 'Something went wrong. Please try again',
            type: 'error',
            id: null
          });
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setMessage({
          show: true,
          text: 'Something went wrong. Please try again',
          type: 'error',
          id: null
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      e.stopPropagation();
    }

    setValidated(true);
  };

  const sendEmail = async order_id => {
    await strapi.axios
      .post('email', {
        to: userInfo.email,
        from: 'arun.webdev@gmail.com',
        replyTo: 'arun.webdev@gmail.com',
        subject: `Order confirmation - RootsMarket | #${order_id} `,
        text: 'Your order Details',
        html: ` <div class="container">
        <h1>Hello ${userInfo.name},</h1>
        <h2 class="display-4">Thanks for shopping with us</h2>
        <hr/>
        <h3 class="lead">Your order number <strong>#${order_id}</strong></h3>
        <h3 class="lead">Total Amount Paid $${userInfo.amount}</h3>
        <p>Credit Card Transaction number #${userInfo.token}</p> 
        <h3 class="lead">Shipping Address</h3>
        <h3 class="lead">${userInfo.address},${userInfo.city}, ${userInfo.state},${userInfo.zipcode}</h3>
        <hr/>
        <a href=${baseUrlApp}>Visit Roots Market again </a>
      </div>`
      })
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        // console.log(error.response);
      });
  };

  return (
    <div className='checkout pt-6 pb-5'>
      <div className='container'>
        {message.show == true && (
          <ToastMessage
            text={message.text}
            autohide={false}
            type={message.type}
          />
        )}
        <div className='row'>
          <div className='col-md-4 order-md-2'>
            <div className='row'>
              <div className='col-12 mt-5'>
                <h4>Items</h4>
                <div className='card no-border p-3'>
                  <Cart cartsize='small' />
                </div>
              </div>
              <div className='col-12 mt-4'>
                <CartTotal
                  shipping={shippingCost}
                  finalAount={getFinalAmount}
                />
              </div>
            </div>
          </div>
          <div className='col-md-8 order-md-1 mb-5'>
            <Form noValidate validated={validated} onSubmit={submitHandler}>
              <div className='row'>
                <div className='col-12 mt-5'>
                  <h4>Address</h4>
                  <div className='card  no-border p-3'>
                    <Address
                      onchange={onChangeHandler}
                      selectedState={selectedState}
                      user={userInfo}
                    />
                  </div>
                </div>
                <div className='col-12 mt-5'>
                  {isLoading && (
                    <Spinner animation='border' variant='success' size='lg' />
                  )}
                  <h4>Shipping</h4>

                  <div className='card  no-border no-border py-4 pl-3 pr-3'>
                    <div className=' d-flex justify-content-between'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='shipping'
                          id='shippingStandard'
                          value={0}
                          onChange={onChangeHandler}
                          required
                        />
                        <label
                          className='form-check-label'
                          htmlFor='shippingStandard'
                        >
                          Standard (Free)
                        </label>
                        <span className='invalid-feedback'>
                          Please select a shipping method.
                        </span>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='shipping'
                          id='shippingExpedited'
                          value={10.0}
                          onChange={onChangeHandler}
                          required
                        />
                        <label
                          className='form-check-label'
                          htmlFor='shippingExpedited'
                        >
                          Expedited $10.00
                        </label>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='shipping'
                          id='shippingNight'
                          value={20.0}
                          onChange={onChangeHandler}
                          required
                        />
                        <label
                          className='form-check-label'
                          htmlFor='shippingNight'
                        >
                          Overnight $20.00
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 mt-5'>
                  <h4>Payment</h4>
                  <div className='card payment-box  no-border p-3 pt-4 pb-4'>
                    <small className=' text-muted pb-1'>
                      sample card number: <strong>4242424242424242.</strong> Any
                      future date for mm/dd, any numbers for cvc, zip
                    </small>
                    <StripePayment token={getStripeToken} />
                    {hasToken && (
                      <span className='input-error'>
                        Please enter credit card information.
                      </span>
                    )}
                  </div>
                  <div className='col-12 mt-3'>
                    <button
                      type='submit'
                      className='btn btn-success'
                      disabled={!hasCart || (message && message.id)}
                    >
                      {hasCart ? 'Pay & Submit' : 'Your Cart is Empty'}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
