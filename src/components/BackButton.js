/* eslint-disable */
import React from 'react';
import { useParams, useHistory } from 'react-router';
const BackButton = ({ path, text }) => {
  let history = useHistory();
  if (path) {
    return (
      <div
        onClick={() => history.push(path)}
        className='back-button d-flex align-items-center'
      >
        {text ? (
          <span className='link'>text</span>
        ) : (
          <i className='fas fa-chevron-left'></i>
        )}
      </div>
    );
  }
  return (
    <div
      onClick={() => history.goBack()}
      className='back-button d-flex align-items-center'
    >
      {text ? (
        <span className='link'>text</span>
      ) : (
        <i className='fas fa-chevron-left'></i>
      )}
    </div>
  );
};

export default BackButton;
