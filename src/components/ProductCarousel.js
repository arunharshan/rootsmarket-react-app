/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import $ from 'jquery';
import { baseUrl } from '../utils';
const ProductCarousel = ({ images }) => {
  let dummy_image =
    typeof images[0] !== 'undefined'
      ? `${images[0].url}`
      : 'https://via.placeholder.com/300x330.png?text=loading....';
  useEffect(() => {}, []);

  const [displayImage, setDisplayImage] = useState(dummy_image);

  const thumbRef = useRef(null);

  // const imageData = [
  //   {
  //     id: 1,
  //     large: 'https://via.placeholder.com/300x330.png?text=image-1',
  //     small: 'https://via.placeholder.com/40x40.png?text=thumb-1'
  //   },
  //   {
  //     id: 2,
  //     large: 'https://via.placeholder.com/300x330.png?text=image-2',
  //     small: 'https://via.placeholder.com/40x40.png?text=thumb-2'
  //   },
  //   {
  //     id: 3,
  //     large: 'https://via.placeholder.com/300x330.png?text=image-3',
  //     small: 'https://via.placeholder.com/40x40.png?text=thumb-3'
  //   },
  //   {
  //     id: 4,
  //     large: 'https://via.placeholder.com/300x330.png?text=image-4',
  //     small: 'https://via.placeholder.com/40x40.png?text=thumb-4'
  //   }
  // ];

  const LoadTiles = () => {
    return images.map(res => {
      return (
        <img
          ref={thumbRef}
          src={`${res.url}`}
          key={res.id}
          className='rounded float-left thumbnail mr-3'
          alt='main image'
          onClick={e => {
            changeImageHandler(`${res.url}`, e);
          }}
        />
      );
    });
  };
  const changeImageHandler = (next, e) => {
    setDisplayImage(next);
  };

  return (
    <div className='product-carousel d-flex flex-column'>
      <Image
        src={displayImage}
        // width={500}
        // height={500}
        className='img-large rounded'
      />

      <div className='mt-4 mb-5'>
        <LoadTiles />
      </div>
    </div>
  );
};

export default ProductCarousel;
