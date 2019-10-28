import { combineReducers } from 'redux';
import accounts from './accountsReducer';
import { category, categories } from './categoryReducer';
import { services, testimony } from './ourServiceReducer';
import { products, product, featured } from './productsReducer';
import cart from './cartReducer';
export default combineReducers({
  auth: accounts,
  category,
  categories,
  products,
  product,
  featured,
  services,
  cart,
  testimonies: testimony
});
