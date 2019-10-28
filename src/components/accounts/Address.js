import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Strapi from 'strapi-sdk-javascript/build/main';
import { baseUrl } from '../../utils';

const strapi = new Strapi(baseUrl);

const Address = ({ onchange, selectedState, user }) => {
  const [usState, setUSstate] = useState();
  useEffect(() => {
    fetch_us_states();
  }, []);
  const fetch_us_states = async () => {
    const result = await strapi.axios('usstates');
    typeof result.data !== 'undefined' && setUSstate(result.data[0].states);
  };
  const StateOptions = () => {
    if (usState !== null && typeof usState !== 'undefined') {
      return usState.map(res => {
        return (
          <option value={res.abbrevation} key={res.name}>
            {res.name}
          </option>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <>
      <div className='form-row mb-0'>
        <div className='form-group col-md-6'>
          <label htmlFor='inputName'>First & Last Name</label>
          <input
            type='text'
            className='form-control form-control-lg'
            id='inputName'
            name='name'
            maxLength='30'
            required
            value={user.name ? user.name : ''}
            onChange={onchange}
          />
          <span className='invalid-feedback'>Please enter your name.</span>
        </div>
        <div className='form-group col-md-6'>
          <label htmlFor='inputEmail'>Email</label>
          <input
            type='email'
            className='form-control form-control-lg'
            id='inputEmail'
            name='email'
            maxLength='30'
            required
            disabled={user.email}
            value={user.email ? user.email : ''}
            onChange={onchange}
          />
          <span className='invalid-feedback'>Please enter a valid email.</span>
        </div>
      </div>

      <div className='form-group mb-3'>
        <label htmlFor='inputAddress'>Address</label>
        <input
          type='text'
          className='form-control form-control-lg'
          id='inputAddress'
          required
          value={user.address ? user.address : ''}
          name='address'
          onChange={onchange}
        />
        <span className='invalid-feedback'>Please enter your address.</span>
      </div>
      <div className='form-row mb-2'>
        <div className='form-group col-md-5'>
          <label htmlFor='inputCity'>City</label>
          <input
            type='text'
            className='form-control form-control-lg'
            id='inputCity'
            maxLength='20'
            required
            name='city'
            value={user.city ? user.city : ''}
            onChange={onchange}
          />
          <span className='invalid-feedback'>Please enter city.</span>
        </div>
        <div className='form-group col-md-4'>
          <label htmlFor='inputState'>State</label>
          <select
            id='inputState'
            name='state'
            value={selectedState}
            className='form-control form-control-lg'
            required
            onChange={onchange}
          >
            <option value=''>Choose...</option>
            <StateOptions selected='0' />
          </select>
          <span className='invalid-feedback'>Please enter state.</span>
        </div>
        <div className='form-group col-md-3'>
          <label htmlFor='inputZip'>Zip</label>
          <input
            type='text'
            maxLength='5'
            className='form-control form-control-lg'
            id='inputZip'
            name='zipcode'
            required
            value={user.zipcode ? user.zipcode : ''}
            onChange={onchange}
          />
          <span className='invalid-feedback'>Please enter zipcode.</span>
        </div>
      </div>
    </>
  );
};

export default Address;
