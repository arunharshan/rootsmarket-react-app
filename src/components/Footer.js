/* eslint-disable */
import { Image } from 'react-bootstrap';
import React from 'react';
import { currentYear, baseUrl } from '../utils';
import TooltipHoc from '../components/TooltipHoc';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer>
      <div className='border-bottom pb-4'>
        <div className='container'>
          <div className='row justify-content-md-between'>
            <div className='col-md-2 col-4  mb-4 mb-lg-0'>
              <h5 className='bold'>About</h5>
              <ul className='list-group'>
                <li>
                  <Link to='/about' className='link'>
                    About this Project
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-md-2 col-4  mb-4 mb-lg-0'>
              <h5 className='bold'>Contact Me</h5>
              <ul className='list-group'>
                <li>
                  <a
                    className=''
                    href='https://www.instagram.com/arunharshan/'
                    target='_blank'
                  >
                    <i className='fab fa-instagram mr-2'></i>Instagram
                  </a>
                </li>
                <li>
                  <a
                    className=''
                    href='https://github.com/arunharshan'
                    target='_blank'
                  >
                    <i className='fab fa-github mr-2'></i>Github
                  </a>
                </li>
                <li>
                  <a
                    className=''
                    href='https://www.linkedin.com/in/arunharshan/'
                    target='_blank'
                  >
                    <i className='fab fa-linkedin mr-2'></i>Linkedin
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className='col-md-2 col-4  mb-4 mb-lg-0'>
              <h5 className='bold'>Resources</h5>
              <ul className='list-group '>
                <li>
                  <a className='' href={''}>
                    Help
                  </a>
                </li>
                <li>
                  <a className='n' href={''}>
                    Terms
                  </a>
                </li>
                <li>
                  <a className='' href={''}>
                    Privacy
                  </a>
                </li>
              </ul>
            </div> */}

            <div className='col-md-6 col-sm-12 text-center'>
              <p className='bold mb-4'>
                We are driven to deliver results for all your businesses.
              </p>
              <TooltipHoc position='top' message='work in progress..'>
                <button
                  type='button'
                  className='btn btn-dark btn-wide text-left mb-2 mr-2'
                >
                  <span className='media align-items-center'>
                    <span className='fab fa-apple fa-2x mr-3'></span>
                    <span className='media-body'>
                      <span className='d-block'>Download on the</span>
                      <strong className='font-size-1'>App Store</strong>
                    </span>
                  </span>
                </button>
              </TooltipHoc>
              <TooltipHoc position='top' message='work in progress..'>
                <button
                  type='button'
                  className='btn btn-dark btn-wide  text-left mb-2'
                >
                  <span className='media align-items-center'>
                    <span className='fab fa-google-play fa-2x mr-3'></span>
                    <span className='media-body'>
                      <span className='d-block'>Download on the</span>
                      <strong className='font-size-1'>Google Play</strong>
                    </span>
                  </span>
                </button>
              </TooltipHoc>
            </div>
          </div>
        </div>
      </div>
      <div className='container text-center pt-4'>
        <a className='d-inline-flex align-items-center mb-2' href={''}>
          <Image
            src={`https://res.cloudinary.com/arunharshan/image/upload/v1572303608/uznquh66omai83wwrvep.png`}
            width={50}
            height={50}
            alt='logo'
            roundedCircle
          />
          {/* <span className='brand brand-primary'>rootsMarket</span> */}
        </a>
        <p className='small text-muted'>
          © {currentYear()} made with love by aH for a better web experience
        </p>
      </div>
    </footer>
  );
}
