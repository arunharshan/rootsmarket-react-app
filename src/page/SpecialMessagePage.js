/* eslint-disable */
import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuth } from '../utils';
const SpecialMessagePage = ({ headline, text, btnText }) => {
  const { order_id, cust_name } = useParams();

  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <div
            className='jumbotron jumbotron-fluid'
            style={{ backgroundColor: 'transparent' }}
          >
            <div className='container'>
              <h1 className='display-4 text-center'>{headline} </h1>
              {order_id && <p className='lead mt-4 '>Hello {cust_name},</p>}
              <p className='lead mt-4'>{text}</p>
              {order_id && (
                <>
                  {' '}
                  <p className='lead mt-4 '>
                    <i>
                      <b>
                        {' '}
                        We have sent you an email to {getAuth().user.email} with
                        order number and transaction details.
                      </b>
                    </i>
                  </p>
                  <p className='lead mt-4 '>
                    Your order number is <strong>#{order_id}</strong>
                  </p>{' '}
                </>
              )}
              <p className='lead mt-4 text-center'>
                <Link to='/' className='link mt-4'>
                  {btnText}
                </Link>
                <Link to='/about' className='link mt-4 ml-5'>
                  About this project
                </Link>
              </p>
            </div>
          </div>{' '}
        </Col>
      </Row>
    </Container>
  );
};
SpecialMessagePage.defaultProps = {
  headline: 'Message Headline',
  text: 'Custom Message',
  btnText: 'Go Home'
};

SpecialMessagePage.propTypes = {
  headline: PropTypes.string,
  text: PropTypes.string,
  btnText: PropTypes.string
};
export default SpecialMessagePage;
