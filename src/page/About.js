/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript';
import { baseUrl } from '../utils';
import ToastMessage from '../components/ToastMessage';
const strapi = new Strapi(baseUrl);
export default function About() {
  const [state, setstate] = useState({
    error: null,
    data: null,
    loading: true
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        await strapi.axios
          .get('abouts')
          .then(function(response) {
            if (typeof response.data[0] !== undefined)
              setstate({ data: response.data[0], loading: false, error: null });
          })
          .catch(function(error) {
            setstate({
              error: 'Unable to Load Data from Database',
              loading: false,
              data: null
            });
          });
      } catch (error) {
        setstate({
          error: 'Database Connection Issue',
          loading: false,
          data: null
        });
      }
    };
    fetchAbout();
  }, []);

  return (
    <Container>
      {state.error && (
        <ToastMessage text={state.error} autohide={false} type='error' />
      )}
      {state.loading && (
        <Spinner animation='border' variant='danger' size='lg' />
      )}

      <Row>
        <Col xs={12} md={12}>
          <div
            className='jumbotron jumbotron-fluid'
            style={{ backgroundColor: 'transparent' }}
          >
            <div className='container'>
              <h2 className='display-4 text-center'>About the Project</h2>
              <h3> Summary </h3>
              <p className='lead mt-4'>{state.data && state.data.summary}</p>
              <h3 className='mb-4'> Frameworks, Tools and Libraries </h3>
              <div>
                {state.data &&
                  state.data.tech.map((res, key) => {
                    return (
                      <div className='mt-2' key={key}>
                        <h4>{res.title}</h4>
                        <p className='lead'>{res.description}</p>
                        {res.points.map((r, i) => {
                          return <p key={i}>{r}</p>;
                        })}
                      </div>
                    );
                  })}
              </div>
              <p className='lead mt-4 text-center'>
                <Link to='/' className='link mt-4'>
                  Home
                </Link>
              </p>
            </div>
          </div>{' '}
        </Col>
      </Row>
    </Container>
  );
}
