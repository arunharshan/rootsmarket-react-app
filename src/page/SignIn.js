import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ToastMessage from '../components/ToastMessage';
import Accounts from '../components/accounts/Accounts';
import { act_signin } from '../store/actions/accountsAction';
import { getAuth } from '../utils';
const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth_state = useSelector(state => state.auth);

  // dont show login page if user is authenticated
  // NOTE: no need to pass the JWT token varification since Strapi does it by itself.
  // useEffect(() => {
  //   dispatch(act_jwt_auth());
  // }, []);

  if (getAuth()) {
    history.push('/cart');
  }

  const submitHandler = inputs => {
    dispatch(act_signin(inputs));
  };

  return (
    <div className='accounts  pt-6 pb-5'>
      <div className='container'>
        <div className='row justify-content-md-center'>
          <div className='col-md-8'>
            {auth_state.signin_error && (
              <ToastMessage
                text={auth_state.signin_error}
                autohide={false}
                type='error'
              />
            )}
            {auth_state.signin_loading && (
              <Spinner animation='border' variant='danger' size='lg' />
            )}
            <Accounts type='signin' title='Sign In' submit={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
