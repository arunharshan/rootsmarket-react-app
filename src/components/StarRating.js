import React from 'react';

const StarRating = ({ rate }) => {
  const countRating = () => {
    switch (true) {
      case rate <= 3:
        return 1;
      case rate > 3 && rate <= 5:
        return 2;
      case rate > 5 && rate <= 7:
        return 3;
      case rate > 7 && rate <= 9:
        return 4;
      default:
        return 5;
    }
  };

  return [...Array(countRating())].map((e, i) => {
    return <i className='fas fa-star' key={i}></i>;
  });
};

export default StarRating;
