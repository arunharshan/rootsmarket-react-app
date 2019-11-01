/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuth } from '../utils';
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Strapi Does The JWT varification by itself in its API calls. No need to verify manually
  // const state = useSelector(state =>
  //   state.auth.jwt_auth ? state.auth.jwt_auth : null
  // );

  const isAuth = getAuth() !== null ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
