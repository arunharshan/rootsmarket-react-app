/* eslint-disable */
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, link } from 'react-router-dom';
// import someManager from '../some-manager';

// export const AuthDataContext = createContext(null);

// const initialAuthData = {};

const Accounts = ({ type, title, submit }) => {
  const history = useHistory();
  const [userInfo, setUserinfo] = useState({});
  const [validated, setValidated] = useState(false);
  const onChangeHandler = e => {
    e.persist();
    setUserinfo(value => ({
      ...value,
      [e.target.name]: e.target.value
    }));
  };
  const submitHandler = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      submit(userInfo);
    } else {
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitHandler}>
      <div className='row'>
        <div className='col-12 mt-5'>
          <h4>{title}</h4>
          <div className='card no-border py-3'>
            <div className='form-group col-12'>
              <label htmlFor='inputEmail'>Email</label>
              <input
                type='email'
                className='form-control form-control-lg'
                id='inputEmail'
                name='email'
                maxLength='30'
                required
                onChange={onChangeHandler}
              />
              <span className='invalid-feedback'>Please enter your email.</span>
            </div>
            <div className='form-group col-12'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control form-control-lg'
                id='password'
                name='password'
                maxLength='20'
                required
                onChange={onChangeHandler}
              />
              <span className='invalid-feedback'>
                Please enter your password.
              </span>
            </div>
            <div className='col-12 mt-3 d-flex justify-content-between'>
              <button type='submit' className='btn btn-success'>
                {type == 'register' ? 'Register' : 'Sign In'}
              </button>
              {type == 'register' ? (
                <Button
                  variant='link'
                  className='link p-0'
                  onClick={() => history.push('/sign-in')}
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  variant='link'
                  className='link p-0'
                  onClick={() => history.push('/sign-up')}
                >
                  New user?
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
//   const [authData, setAuthData] = useState(initialAuthData);

//   /* The first time the component is rendered, it tries to
//    * fetch the auth data from a source, like a cookie or
//    * the localStorage.
//    */
//   useEffect(() => {
//     const currentAuthData = someManager.getAuthData();
//     if (currentAuthData) {
//       setAuthData(currentAuthData);
//     }
//   }, []);

//   const onLogout = () => setAuthData(initialAuthData);

//   const onLogin = newAuthData => setAuthData(newAuthData);

//   const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

//   return <AuthDataContext.Provider value={authDataValue} {...props} />;
// export const useAuthDataContext = () => useContext(AuthDataContext);

//export default SignIn;

export default Accounts;
