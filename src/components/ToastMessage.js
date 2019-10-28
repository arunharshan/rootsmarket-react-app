import React, { useState, useEffect } from 'react';
import { Toast, Image } from 'react-bootstrap';
import { baseUrl } from '../utils';
const Cart = ({ text, type, autohide }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    //
  }, [show]);
  const path = `https://res.cloudinary.com/arunharshan/image/upload/v1572303608/uznquh66omai83wwrvep.png`;

  return (
    <Toast
      show={show}
      delay={3000}
      autohide={autohide}
      onClose={() => setShow(!show)}
    >
      <div>
        <Image
          src={path}
          width={35}
          height={35}
          alt='img'
          roundedCircle
          className={type}
        />
      </div>

      <div className={`alert alert-dismissible alert-${type}`} role='alert'>
        {text}
        {!autohide && (
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
            onClick={() => setShow(!show)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        )}
      </div>
    </Toast>
  );
};

export default Cart;
