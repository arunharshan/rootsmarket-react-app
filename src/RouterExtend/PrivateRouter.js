import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuth, baseUrl, removeAuth } from '../utils';
import Strapi from 'strapi-sdk-javascript';
const strapi = new Strapi(baseUrl);
let auth = false;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, setstate] = useState(true);
  const jwtAuth = async () => {
    if (getAuth() !== null) {
      try {
        await strapi.axios
          .get('users/me', {
            headers: {
              Authorization: `Bearer ${getAuth().jwt}`
            }
          })
          .then(res => {
            auth = true;
          })
          .catch(error => {
            auth = false;
          });
      } catch (error) {
        auth = false;
      }
      if (!auth) {
        removeAuth();
      }
      setstate(auth);
    }
  };
  jwtAuth();
  return (
    <Route
      {...rest}
      render={props =>
        state ? (
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
