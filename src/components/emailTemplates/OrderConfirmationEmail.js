import React from 'react';

const OrderConfirmationEmail = ({ values }) => {
  return (
    <div class='jumbotron jumbotron-fluid'>
      <div class='container'>
        <h1 class='display-4'>${values}</h1>
        {/* <p class='lead'>${userInfo.address}</p> */}
      </div>
    </div>
  );
};

export default OrderConfirmationEmail;
