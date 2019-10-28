import React, { useState } from 'react';
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider
} from 'react-stripe-elements';
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '1.2rem',
        color: '#495057',
        fontFamily: 'Merriweather, serif',
        letterSpacing: '0.025em',
        fontWeight: '100',
        '::placeholder': {
          color: '#495057'
        }
      }
    }
  };
};
const _StripeForm = ({ stripe, getToken }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const generateToken = async () => {
    if (stripe) {
      const response = await stripe.createToken();
      response.token
        ? getToken(response.token.id)
        : setErrorMessage(response.error.message);
    } else {
      console.log('stripe payment loading..');
    }
  };

  const handleChange = async ({ error }) => {
    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
      generateToken();
    }
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   if (stripe) {
  //     const response = await stripe.createToken();
  //     response.token
  //       ? getToken(response.token.id)
  //       : setErrorMessage(response.error.message);
  //   } else {
  //     console.log('stripe payment loading..');
  //   }
  // };
  return (
    <div className='row'>
      <div className='col-12'>
        <CardElement
          id='stripe_payment'
          // onReady={input => input.focus()}
          onChange={handleChange}
          {...createOptions()}
          className='p-3 card'
        />
        <span className='input-error' role='alert'>
          {errorMessage}
        </span>
      </div>
      {/* <div className='col-12 mt-3'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div> */}
    </div>
  );
};

const StripeForm = injectStripe(_StripeForm);

const StripePayment = ({ token }) => (
  <StripeProvider apiKey='pk_test_9TdDtDfvOFkIJQMUe5MfKE0o008n4kYUZ4'>
    <Elements>
      <StripeForm getToken={token} />
    </Elements>
  </StripeProvider>
);

export default StripePayment;
