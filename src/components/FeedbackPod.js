import React, { useEffect } from 'react';

import { Image } from 'react-bootstrap';
import { baseUrl } from '../utils';
const FeedbackPod = ({ values }) => {
  let image_path = values.image
    ? values.image.url
    : `https://via.placeholder.com/20x20.png?text=loading..`;
  useEffect(() => {
    image_path = values.image
      ? values.image.url
      : `https://via.placeholder.com/20x20.png?text=loading..`;
  }, [values]);

  return (
    <div className='card text-center p-4 mb-5'>
      <Image src={image_path} roundedCircle className='top-image' />
      <i className='fas fa-quote-left text-left'></i>
      <span className='text'>{values.comments}</span>
      <i className='fas fa-quote-right text-right'></i>
    </div>
  );
};

export default FeedbackPod;
