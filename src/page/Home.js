/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Row, Container, Col, Image, Spinner } from 'react-bootstrap';

import Slider from '../components/Slider';

import ProductTile from '../components/ProductTile';
import ImageTextPod from '../components/ImageTextPod';
import FeedbackPod from '../components/FeedbackPod';
import ToastMessage from '../components/ToastMessage';

import { act_fetch_featured_products } from '../store/actions/productsAction';
import { act_fetch_category } from '../store/actions/categoryAction';
import {
  act_fetch_service,
  act_fetch_testmony
} from '../store/actions/ourServiceAction';

import { baseUrl } from '../utils';

const Home = () => {
  const { categories, services, testimonies, featured } = useSelector(
    state => state
  );

  const IsDbRunning = () => {
    if (
      categories.error &&
      services.error &&
      testimonies.error &&
      featured.error
    ) {
      return (
        <ToastMessage
          text={`Looks like the we have lost the Data base connection. ${categories.error} `}
          autohide={false}
          type='error'
        />
      );
    } else {
      return null;
    }
  };

  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(act_fetch_featured_products());
      await dispatch(act_fetch_category());
      await dispatch(act_fetch_service());
      await dispatch(act_fetch_testmony());
    };
    loadData();
  }, []);

  const icons = ['fa-truck', 'fa-tags', 'fa-headset'];

  return (
    <div className='home-page pos-relative'>
      {<IsDbRunning />}
      {categories.data ? (
        <Slider values={categories.data} />
      ) : categories.loading ? (
        <Spinner animation='border' variant='success' size='lg' />
      ) : categories.error ? (
        <div
          className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
          role='alert'
          style={{ height: '400px' }}
        >
          <Spinner animation='grow' variant='danger' />
          {categories.error}
          <br />
          Unable to connect to database
        </div>
      ) : (
        ''
      )}
      <Container className='mt-5 mb-5 category pos-relative'>
        <h4 className='title'>Category</h4>
        <div className='d-flex justify-content-around'>
          {categories.data ? (
            categories.data.map(res => {
              return (
                <div key={res._id}>
                  {' '}
                  <Image
                    onClick={() => history.push(`/category/${res.id}`)}
                    src={
                      res.image_small !== null
                        ? res.image_small.url
                        : `https://via.placeholder.com/50x50.png?text=loading..`
                    }
                    roundedCircle
                    className='hover-shadow'
                  />
                  <h4 className='text-center'>{res.title_small}</h4>
                </div>
              );
            })
          ) : categories.loading ? (
            <Spinner animation='border' variant='warning' size='lg' />
          ) : categories.error ? (
            <div
              className='col-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
              role='alert'
            >
              <Spinner animation='grow' variant='danger' />
              {categories.error}
              <br />
              Unable to connect to database
            </div>
          ) : (
            ''
          )}
        </div>
      </Container>
      <Container className='mt-5 mb-5 featured'>
        <h4 className='title'>Featured Products</h4>
        <Row>
          {featured.data ? (
            featured.data.map(res => {
              return (
                <Col xs={6} md={4} key={res._id}>
                  <ProductTile values={res} />
                </Col>
              );
            })
          ) : featured.loading ? (
            <Spinner animation='border' variant='warning' size='lg' />
          ) : featured.error ? (
            <div
              className='col-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
              role='alert'
            >
              <Spinner animation='grow' variant='danger' />
              {featured.error}
              <br />
              Unable to connect to database
            </div>
          ) : (
            ''
          )}
        </Row>
      </Container>
      <div className='mt-5 mb-5 services'>
        <Container>
          <Row>
            {services.data ? (
              services.data.map((res, i) => {
                return (
                  <Col xs={12} md={4} key={res._id}>
                    <ImageTextPod values={res} icon={icons[i]} />
                  </Col>
                );
              })
            ) : services.loading ? (
              <Spinner animation='border' variant='warning' size='lg' />
            ) : services.error ? (
              <div
                className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
                role='alert'
              >
                <Spinner animation='grow' variant='danger' />
                {services.error}
                <br />
                Unable to connect to database
              </div>
            ) : (
              ''
            )}
          </Row>
        </Container>
      </div>
      <Container className='mt-5 mb-5 feedback'>
        <h4 className='title'>Customer feedback</h4>
        <Row>
          {testimonies.data ? (
            testimonies.data.map(res => {
              return (
                <Col xs={12} md={4} key={res._id}>
                  <FeedbackPod values={res} />
                </Col>
              );
            })
          ) : testimonies.loading ? (
            <Spinner animation='border' variant='warning' size='lg' />
          ) : testimonies.error ? (
            <div
              className='container alert alert-dark text-danger d-flex justify-content-center align-items-center'
              role='alert'
            >
              <Spinner animation='grow' variant='danger' />
              {testimonies.error}
              <br />
              Unable to connect to database
            </div>
          ) : (
            ''
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
