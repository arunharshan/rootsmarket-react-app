/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Col, Container, Row, Image, Spinner } from 'react-bootstrap';
import BackButton from '../components/BackButton';
import ProductTile from '../components/ProductTile';
import ToastMessage from '../components/ToastMessage';
import TooltipHoc from '../components/TooltipHoc';
import { baseUrl } from '../utils';
import { act_fetch_a_category } from '../store/actions/categoryAction';
const Categories = () => {
  const { category_id } = useParams();
  const { category } = useSelector(state => state);
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(act_fetch_a_category(category_id));
    };
    loadData();
  }, [category_id]);

  let result = null;
  if (typeof category.data !== 'undefined') {
    result = category.data;
  }
  const IsDbRunning = () => {
    // or check the status code.
    if (category.error == 'Error: Network Error') {
      return (
        <ToastMessage
          text={`Looks like the we have lost the Data base connection. ${category.error} `}
          autohide={false}
          type='error'
        />
      );
    } else {
      return null;
    }
  };

  let small_url =
    result && result.image_small
      ? `${result.image_small.url}`
      : 'https://via.placeholder.com/150x150.png?text=loading..';
  let large_url =
    result && result.image_large
      ? `${result.image_large.url}`
      : 'https://via.placeholder.com/800x350.png?text=loading..';

  return (
    <div className='products'>
      <IsDbRunning />
      <div
        className='product-banner d-flex justify-content-center'
        style={{
          backgroundImage: `url(${large_url})`
        }}
      >
        <Image
          onClick={() => history.push('/product/vegies')}
          src={small_url}
          height={150}
          width={150}
          roundedCircle
        />
      </div>

      <div className='container d-flex justify-content-between  mt-6 mb-5'>
        <BackButton path='/'></BackButton>
        <TooltipHoc position='top' message='..work in progress'>
          <div className='card text-center w-100 ml-4'>
            <div className='card-body text-muted'>Sort | Filter | Search</div>
          </div>
        </TooltipHoc>
      </div>

      <Container>
        {category.error && (
          <div
            className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
            role='alert'
          >
            <Spinner animation='grow' variant='danger' />
            <br />
            {category.error ? `${category.error} ` : 'No data found.'}
          </div>
        )}
        {result ? (
          <>
            <Row>
              {result.products.map(res => {
                return (
                  <Col xs={12} md={4} key={res.id}>
                    <ProductTile values={res} />
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <Spinner animation='border' variant='success' size='lg' />
        )}
      </Container>
    </div>
  );
};

export default Categories;
