import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Col, Container, Row, Tabs, Tab, Spinner } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import BackButton from '../components/BackButton';
import ProductCarousel from '../components/ProductCarousel';
import AddToCart from '../components/AddToCart';
import TooltipHoc from '../components/TooltipHoc';
import ToastMessage from '../components/ToastMessage';
import { act_fetch_a_product } from '../store/actions/productsAction';
import { setLocalCart, getLocalCart, removeLocalCart, baseUrl } from '../utils';
const Product = () => {
  const { product_id } = useParams();
  let history = useHistory();
  const [favIcon, setFavIcon] = useState(false);
  const { product } = useSelector(state => state);
  const [info, setInfo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(act_fetch_a_product(product_id));
    };
    loadData();
  }, [product_id]);

  let result = null;
  if (typeof product.data !== 'undefined') {
    if (product.data !== null) {
      result = product.data[0];
    } else {
      result = null;
    }
  }
  const IsDbRunning = () => {
    // or check the status code.
    if (product.error == 'Error: Network Error') {
      return (
        <ToastMessage
          text={`Looks like the we have lost the Data base connection. ${product.error} `}
          autohide={false}
          type='error'
        />
      );
    } else {
      return null;
    }
  };
  const toggleFavIcon = () => {
    setFavIcon(!favIcon);
  };

  return (
    <div className='product-details pb-5'>
      <Container>
        <IsDbRunning />
        <div className='container d-flex justify-content-between pt-5 mb-5'>
          <BackButton></BackButton>
        </div>
        {!product.loading && result !== null ? (
          <Container>
            <Row className='bg-white py-4'>
              <Col xs={12} md={6}>
                <ProductCarousel images={result.thumbnails} />
              </Col>
              <Col xs={12} md={6}>
                <div className=''>
                  <div className='card-body pt-0'>
                    <h4 className='card-title'> {result.title}</h4>
                    <div className='d-flex align-items-center'>
                      <div className='mr-2 mb-1'>
                        <StarRatings
                          rating={result.rating}
                          starDimension='16px'
                          starSpacing='2px'
                        />
                      </div>
                      |{' '}
                      <small className='ml-2 mr-2'>
                        {Math.round(result.rating)
                          ? Math.round(result.rating)
                          : 'No'}{' '}
                        reviews
                      </small>{' '}
                      |<small className='ml-2'>by {result.supplier}</small>
                    </div>
                    <h3 className='mt-4 mb-4'>
                      ${result.price}/ unit{' '}
                      {result.has_offer && (
                        <>
                          (
                          <span className='badge badge-success  mr-1 p-1'>
                            Offer
                          </span>
                          <span className='text-danger'>
                            was
                            <span className='ml-1'>
                              ${result.old_price}/ unit
                            </span>
                          </span>
                          ){' '}
                        </>
                      )}
                    </h3>
                    <AddToCart
                      id={result.id}
                      size='default'
                      isDisable={!result.avaliable}
                      price={result.price}
                      showDeleteBtn={false}
                    />
                    <div className='mb-4'>
                      {result.avaliable ? (
                        <span className='text-success'>
                          Item in stock <i className='far fa-check-circle'></i>
                        </span>
                      ) : (
                        <span className='text-danger'>
                          Out of stock <i className='far fa-times-circle'></i>
                        </span>
                      )}
                    </div>
                    <div className='mb-4 d-flex mt-2'>
                      <TooltipHoc
                        position='top'
                        message='(Click to see it in action ). work in progress'
                      >
                        <div
                          className='mr-3 cursor-pointer'
                          onClick={toggleFavIcon}
                        >
                          {favIcon ? (
                            <i className='fas fa-heart text-danger'></i>
                          ) : (
                            <i className='far fa-heart'></i>
                          )}
                          <span className='pl-2'>Add to Wish List</span>
                        </div>
                      </TooltipHoc>{' '}
                      |
                      <TooltipHoc
                        position='top'
                        message='Social media- work under progress'
                      >
                        <div className='ml-3'>
                          <i className='fab fa-facebook-f mr-3'></i>
                          <i className='fab fa-pinterest mr-3'></i>
                          <i className='fab fa-twitter mr-3'></i>
                        </div>
                      </TooltipHoc>
                    </div>

                    <div className='card-text'>
                      <h5>Product Highlights</h5>
                      <p>{result.details}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row
              sm={12}
              md={6}
              className='d-flex flex-column mt-3 card p-4 no-border'
            >
              <Tabs defaultActiveKey='1' id='desc-tab'>
                <Tab eventKey='1' title='Descrition'>
                  <div className='py-3'>{result.description}</div>
                </Tab>
                <Tab eventKey='2' title='Product Details'>
                  <div className='py-3'>{result.details}</div>
                </Tab>
              </Tabs>
            </Row>
            <Row
              sm={12}
              md={6}
              className='d-flex flex-column card mt-3 p-4 no-border'
            >
              <h5 className='pb-2'>Reviews</h5>
              <p>
                {' '}
                {result.reviews
                  ? result.reviews
                  : 'Be the first person to review this item!'}
              </p>
              <div className='d-flex'>
                <TooltipHoc position='top' message='coming soon..'>
                  <button type='button' className='btn btn-outline-success'>
                    Write a Review
                  </button>
                </TooltipHoc>
              </div>
            </Row>
          </Container>
        ) : product.error || result == null ? (
          <Container>
            <div>
              <Col xs={12}>
                <div
                  className='col-sm-12 alert alert-dark text-danger d-flex justify-content-center align-items-center'
                  role='alert'
                >
                  <Spinner animation='grow' variant='danger' />
                  <br />
                  {product.error ? product.error : 'No data found.'}
                </div>
              </Col>
            </div>
          </Container>
        ) : (
          <Spinner animation='border' variant='success' size='lg' />
        )}
      </Container>
    </div>
  );
};

export default Product;
