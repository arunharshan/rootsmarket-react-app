/* eslint-disable */
import React, { useState, useEffect } from 'react';
const Quantity = ({ oldQty, newQty }) => {
  const [qty, setQty] = useState(null);

  useEffect(() => {
    setQty(parseInt(oldQty));
  }, [oldQty]);

  const changeHandler = e => {
    setQty(e.target.value);
  };

  useEffect(() => {
    qty < 0 || qty > 10 ? setQty(1) : newQty(qty);
  }, [qty]);
  return (
    <div className='d-flex'>
      <div className='input-group quantity-counter'>
        <div className='input-group-prepend '>
          <button
            className='btn btn-outline-secondary'
            type='button'
            disabled={qty <= 1}
            onClick={() => {
              qty >= 2 && setQty(qty - 1);
            }}
          >
            <i className='fas fa-minus'></i>
          </button>
        </div>

        <input
          min='1'
          max='10'
          step='1'
          size='10'
          value={qty ? qty : 1}
          name='quantity'
          onChange={changeHandler}
          type='number'
          className='form-control'
          placeholder=''
          aria-label='quantity counter'
          aria-describedby='quantity counter'
        />
        <div className='input-group-append'>
          <button
            className='btn btn-outline-secondary '
            type='button'
            disabled={qty >= 10}
            onClick={() => {
              qty <= 9 && setQty(qty + 1);
            }}
          >
            <i className='fas fa-plus'></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Quantity;
