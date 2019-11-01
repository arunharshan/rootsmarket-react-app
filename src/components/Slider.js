/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';

import { baseUrl } from '../utils';

const Slider = ({ values }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    let image_path = `${values.image_large}`;
    // if (values.image !== null) {
    //   return image_path;
    // } else {
    //   image_path = `https://via.placeholder.com/800x350.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide`;
    // }
  }, [values]);
  const handleSelect = (selectedIndex, e) => {
    // alert(selectedIndex);
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  const alt_image = `https://via.placeholder.com/800x400.png?text=loading..`;
  return (
    <Carousel
      activeIndex={index}
      direction={direction}
      onSelect={handleSelect}
      fade={true}
      controls={false}
    >
      {values.map(res => {
        const image_path = res.image_large ? res.image_large.url : alt_image;
        return (
          <Carousel.Item key={res._id}>
            <div
              className='carousel-bg-image'
              style={{
                backgroundImage: `url( ${image_path}  )`
              }}
            ></div>
            <Carousel.Caption>
              <h3>{res.title_small}</h3>
              <p>{res.title_large}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Slider;
