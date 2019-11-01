/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { Router, Route, Switch } from 'react-router-dom';
import history from './RouterExtend';
import ScrollToTop from './RouterExtend/ScrollToTop';
import PrivateRoute from './RouterExtend/PrivateRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import SignIn from './page/SignIn';
import About from './page/About';
import Register from './page/Register';
import Dashboard from './page/Dashboard';
import SpecialMessagePage from './page/SpecialMessagePage';
import Categories from './page/Categories';
import Product from './page/Product';
import Cart from './page/Cart';
import Checkout from './page/Checkout';

import { setGuestId, getGuestId, getAuth } from './utils';

const App = () => {
  getGuestId() == null && getAuth() == null && setGuestId();
  return (
    <Provider store={store}>
      <Router history={history}>
        <ScrollToTop>
          <Header />
          <div className='body-container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/checkout' component={Checkout} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-up' component={Register} />
              <Route exact path='/cart' component={Cart} />
              <Route
                exact
                path='/category/:category_id'
                component={Categories}
              />
              <Route exact path='/product/:product_id' component={Product} />
              <Route exact path='/about' component={About} />
              <PrivateRoute
                exact
                path='/thank-you/:cust_name/:order_id'
                component={() => (
                  <SpecialMessagePage
                    headline='Order Completed Successfully!'
                    text='Thank you for shopping with us. Your order has been placed successfully. The products will reach you soon.'
                    btnText='Shop Again'
                  />
                )}
              />
              <Route
                component={() => (
                  <SpecialMessagePage
                    headline='Page Not Found 404!'
                    text='Something went Wrong.'
                    btnText='Go to Home'
                  />
                )}
              />
            </Switch>
          </div>
        </ScrollToTop>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
