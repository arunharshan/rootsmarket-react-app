import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { baseUrl } from '../utils';
const ImageTextPod = ({ values, icon }) => {
  // let image_path = `${baseUrl}${values.image}`;
  let image_path =
    'https://via.placeholder.com/150x150.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide';
  useEffect(() => {
    image_path = values.image && `${values.image}`;
  }, [values]);

  // const Favs = () => {
  //   return ['fa-truck', 'fa-money-check-alt', 'fa-tags', 'fa-headset'].map(
  //     (variant, idx) => (
  //       <i key={idx} className={`fas ${variant}`}>
  //         {' '}
  //       </i>
  //     )
  //   );
  // };

  return (
    <div className='card d-flex p-3'>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`fas ${icon}`} style={{ fontSize: '2rem' }}>
          {' '}
        </i>
        <p>
          <span className='ml-3 d-flex align-items-center  font-weight-bold'>
            {values.title}
          </span>
          <span className='ml-3 d-flex align-items-center'>
            {values.description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ImageTextPod;
