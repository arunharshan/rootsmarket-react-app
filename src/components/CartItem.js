import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddToCart from '../components/AddToCart';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils';
import { Spinner } from 'react-bootstrap';
const _ = require('lodash');

const CartItem = ({ size, values, getDelete, deleteBtn, buttonText }) => {
  const [small, setSmall] = useState(size === 'small' ? true : false);
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000);
  }, [timer]); // animation

  return (
    <>
      <div className='card no-border mb-3 p-2'>
        <div className='row no-gutters d-flex justify-content-between align-items-center'>
          <div className={` ${small ? 'hide' : 'col-md-3 col-sm-12'}`}>
            <Image
              width={small ? 50 : 100}
              height={small ? 50 : 100}
              src={
                typeof values.thumbnails[0] !== 'undefined'
                  ? values.thumbnails[0].url
                  : `https://via.placeholder.com/100x100.png?text=loading..`
              }
              className='float-left img-fluid mb-3'
              alt='product'
            />
          </div>
          <div className={`mb-2  ${small ? '' : 'col-md-9 col-sm-12 pt-2'}`}>
            <Link to={`/product/${values.id}`} className='card-title mb-1 '>
              <h5> {values.title}</h5>
            </Link>
            {timer && values && (
              <Spinner animation='border' variant='info' size='md' />
            )}
            {!small && (
              <p className='card-text'>
                <small className='text-muted'>by {values.supplier}</small>{' '}
                <br />
                <span>
                  {_.truncate([values.description], {
                    length: 82
                  })}
                </span>{' '}
                <br />
              </p>
            )}
            <AddToCart
              id={values.id}
              isDisable={!values.avaliable}
              price={values.price}
              showDeleteBtn={deleteBtn}
              buttonText={buttonText}
              size={size}
            />
          </div>
        </div>
      </div>
    </>
  );
};
CartItem.defaultProps = {
  size: 'default',
  buttonText: 'Add to Cart'
};

CartItem.propTypes = {
  size: PropTypes.string
};
export default CartItem;
