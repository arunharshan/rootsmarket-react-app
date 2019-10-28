import { DropdownButton, Dropdown, Image, Button } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, link } from 'react-router-dom';
import { act_signout } from '../store/actions/accountsAction';
import { getAuth, baseUrl } from '../utils';
import $ from 'jquery';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const [navbg, setNavbg] = useState(null);
  //const [navbg, setNavbg] = useState('header-theme');

  const isHomePage = history.location.pathname == '/' ? true : false;
  const isCategoryPage =
    history.location.pathname.indexOf('/category/') == 0 ? true : false;

  useEffect(() => {
    $(window).scroll(function(e) {
      var scrollTop = $(window).scrollTop();
      let nav = headerRef.current;
      nav = $(nav).height();
      scrollTop > nav ? setNavbg('header-theme') : setNavbg(null);
    });
  }, []);

  return (
    // !isHomePage ? 'header-theme sticky-top' : 'fixed-top'
    <header
      style={{ transition: '1.2s ease' }}
      className={`py-2 ${isHomePage || isCategoryPage ? ' fixed-top' : ''} ${
        isHomePage || isCategoryPage ? `${navbg}` : ''
      }`}
      ref={headerRef}
    >
      <div className='d-flex justify-content-around align-items-center'>
        <div>&nbsp;</div>
        <div className='header-logo' onClick={() => history.push('/')}>
          <Image
            onClick={() => history.push('/')}
            src={`https://res.cloudinary.com/arunharshan/image/upload/v1572303608/uznquh66omai83wwrvep.png`}
            width={50}
            height={50}
            alt='logo'
          />
          RootsMarket
        </div>
        <div className='mr-4 d-flex align-items-center'>
          <DropdownButton
            id='dropdown-basic-button'
            title={
              <svg
                viewBox='0 0 20 20'
                name='account'
                style={{ width: '1rem', height: '1rem' }}
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g
                    transform='translate(-14.000000, -84.000000)'
                    fill='#000000'
                    fillRule='nonzero'
                  >
                    <g transform='translate(15.000000, 84.000000)'>
                      <path d='M9 8C10.66 8 12 6.66 12 5 12 3.34 10.66 2 9 2 7.34 2 6 3.34 6 5 6 6.66 7.34 8 9 8ZM5.54 8.61C4.59 7.7 4 6.42 4 5 4 2.24 6.24 0 9 0 11.76 0 14 2.24 14 5 14 6.42 13.41 7.7 12.46 8.61 16.28 10.02 19 13.69 19 18L17 18C17 13.58 13.42 10 9 10 4.58 10 1 13.58 1 18L-1 18C-1 13.69 1.72 10.02 5.54 8.61Z'></path>
                    </g>
                  </g>
                </g>
              </svg>
            }
            className='mr-2 ml-2'
          >
            <Dropdown.Item
              onClick={() => history.push('/sign-in')}
              disabled={getAuth() !== null}
            >
              Sign In
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => history.push('/sign-up')}
              disabled={getAuth() !== null}
            >
              New customer? start here
            </Dropdown.Item>
            {getAuth() !== null && (
              <Dropdown.Item
                onClick={() => {
                  dispatch(act_signout());
                  history.push('/');
                }}
              >
                Sign Out
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => history.push('/cart')}>
              Cart
            </Dropdown.Item>
            <Dropdown.Item onClick={() => history.push('/checkout')}>
              Checkout
            </Dropdown.Item>
          </DropdownButton>
          <Button
            variant='link'
            className='ml-2'
            onClick={() => history.push('/cart')}
          >
            <Image
              src={`https://res.cloudinary.com/arunharshan/image/upload/v1572303698/qvo5chlcgfq6ovhzfnva.png`}
              width={20}
              height={20}
              alt='cart'
            />

            {/* <i className='fas fa-shopping-bag' alt='cart'></i> */}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
