import { FETCH_SEARCH, ERROR_MESSAGE, LOADING } from './types';
import axios from 'axios';

const baseurl =
  process.env.NODE_ENV == 'production'
    ? 'https://website.api.sample.com'
    : 'http://localhost:url';

const search = user => async dispatch => {
  dispatch(isLoading);
  try {
    await axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      if (res.data) {
        dispatch({
          type: FETCH_SEARCH,
          payload: res.data
        });
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'No data found!'
        });
      }
    });
  } catch (error) {
    dispatch({ type: ERROR_MESSAGE, payload: 'error' });
  }
};

const getUser = (data, id) => async dispatch => {
  // dispatch(isLoading);
  // try {
  //   await axios({
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'put',
  //     url: `${baseurl}/expenses/${id}`,
  //     data
  //   }).then(res => {
  //     if (res.data) {
  //       dispatch({
  //         type: FETCH_ACTION,
  //         payload: true
  //       });
  //     } else {
  //       dispatch({
  //         type: ERROR_MESSAGE,
  //         payload: true
  //       });
  //     }
  //   });
  // } catch (error) {}
};

const isLoading = () => {
  return {
    type: LOADING
  };
};

//export default fetchAction;
export { getUser, search };
