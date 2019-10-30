import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ToastMessage from '../components/ToastMessage';
import Accounts from '../components/accounts/Accounts';
import { act_signup } from '../store/actions/accountsAction';
import { getAuth } from '../utils';

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth_state = useSelector(state => state.auth);

  // dont show login page if user is authenticated
  // useEffect(() => {
  //   dispatch(act_jwt_auth());
  // }, []);

  // NOTE: no need to pass the JWT token varification since Strapi does it by itself.

  if (getAuth()) {
    history.push('/cart');
  }

  const submitHandler = async inputs => {
    dispatch(act_signup(inputs));
  };

  // console.log(auth_state);
  return (
    <div className='accounts  pt-6 pb-5'>
      <div className='container'>
        <div className='row justify-content-md-center'>
          <div className='col-md-8'>
            {auth_state.signup_error && (
              <ToastMessage
                text={auth_state.signup_error}
                autohide={false}
                type='error'
              />
            )}
            {auth_state.signup_loading && (
              <Spinner animation='border' variant='danger' size='lg' />
            )}
            <Accounts
              type='register'
              title='New Customer'
              submit={submitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
