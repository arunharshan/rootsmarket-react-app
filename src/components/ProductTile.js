import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { baseUrl } from '../utils';
const ProductTile = ({ values }) => {
  // const [data, setData] = useState();
  useEffect(() => {
    // setData(values);
  }, [values]);

  let history = useHistory();
  if (values == 'undefined') {
    return (
      <div className='card text-center hover-shadow d-flex align-items-center px-3 pt-2'>
        No data..
      </div>
    );
  }
  return (
    <Link to={`/product/${values.id}`} className='no-highlight'>
      <div className='card text-center hover-shadow d-flex align-items-center px-3 pt-2'>
        <img
          className='card-img-top img-fluid rounded'
          src={
            typeof values.thumbnails[0] !== 'undefined'
              ? values.thumbnails[0].url
              : `https://via.placeholder.com/40x40.png?text=loading..`
          }
          alt={values.title}
          style={{ width: '10rem', height: '10rem' }}
        />
        <div className='mt-4 mb-5'>
          <h5>{values.title}</h5>
          <p>${values.price}/unit</p>
          {values.has_offer && (
            <>
              <span className='badge badge-success mr-1'>Offer</span>
              <span className='text-danger'>
                was
                <strike className='ml-1'>${values.old_price}/ unit</strike>
              </span>
            </>
          )}
          {/* <p className='text-muted text-truncate' style={{ width: '20rem' }}>
            {values.description}
          </p> */}
        </div>
      </div>
    </Link>
  );
};
ProductTile.defaultProps = {
  values: {}
};
ProductTile.propTypes = {
  values: PropTypes.object.isRequired
};
export default ProductTile;
