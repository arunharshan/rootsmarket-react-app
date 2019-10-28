// import React from 'react';

const OrderConfirmationEmail = () => {
  return (
    <html>
      <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />

        <link
          rel='stylesheet'
          media='all'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ></link>
        <link
          rel='stylesheet'
          media='all'
          href='http://localhost:1337/uploads/727722e8d9fe483bb440a3b348f7a488.css'
        ></link>
      </head>
      <body class='bg-light'>
        <preview>
          Thank you for shopping with RootsMarket (sample email)
        </preview>
        <div class='container'>
          <div class='text-center'>
            <img
              class='mx-auto mt-4 mb-3 text-center'
              width='42'
              height='30'
              src='http://localhost:1337/uploads/59a9c04d84334feeb17d892cd360b597.png'
            />
          </div>

          <div class='card mb-4' style='border-top: 5px solid #2cc185;'>
            <div class='card-body'>
              <h3 class='text-center'>Hello Arun,</h3>
              <h4 class='mt-1 text-center'>
                Thanks for shopping with RootsMarket
              </h4>
              <h5 class='mt-1 text-muted text-center'>newData()</h5>
              <h5 class='mt-1  text-center'>
                Your Order number <strong>#1288319391739179371298</strong>
              </h5>
              <hr />
              <h5 class='text-center'>
                <strong>Order Details</strong>
              </h5>

              <table class='table'>
                <tbody>
                  <tr>
                    <td style='border-top: 0;'>Item Name</td>
                    <td style='border-top: 0;' class='text-right'>
                      Amount !0.33
                    </td>
                  </tr>
                  <tr>
                    <td style='border-top: 0;'>Shipping</td>
                    <td style='border-top: 0;' class='text-right'>
                      Amount !0.33
                    </td>
                  </tr>
                  <tr>
                    <td style='border-top: 0;'>Tax</td>
                    <td style='border-top: 0;' class='text-right'>
                      Amount !0.33
                    </td>
                  </tr>

                  <tr>
                    <td style='border-top: 0;'>
                      <h4>
                        <strong>Order Total</strong>
                      </h4>
                    </td>
                    <td style='border-top: 0;' class='text-right'>
                      <h4 class='text-right'>
                        <strong>$11.87</strong>
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class='card w-100 mb-4'>
            <div class='card-body'>
              <h5 class=' mb-2'>
                <strong>Shipped To</strong>
              </h5>
              <p>Arun Harshan, 3934 Main st, Karuvatta, Dallas Tx 509009</p>
            </div>
          </div>
          <div class='card w-100 mb-4'>
            <div class='card-body'>
              <div class='text-center'>
                <img
                  width='50'
                  height='50'
                  class='mx-auto'
                  src='http://localhost:1337/uploads/f4ef924a3041484282a8031a3889fd74.png'
                />
              </div>
              <h4 class='text-center'>Would you like to shop more?</h4>
              <p class='text-center'>
                <a
                  class='btn btn-success mx-auto mt-2 text-center'
                  href='http://localhost:3000'
                >
                  Shop More
                </a>
              </p>
            </div>
          </div>

          <table class='table table-unstyled text-muted mb-4'>
            <tbody>
              <tr>
                <td style='border-top: 0;'>© ah 2019</td>
                <td style='border-top: 0;'>
                  <a
                    href='https://www.linkedin.com/in/arunharshan/'
                    class='float-right pl-2'
                  >
                    <img
                      width='25'
                      height='25'
                      alt='linkedIn'
                      src='http://localhost:1337/uploads/867b8379d4bf49d789d9a75cda419826.png'
                    />
                  </a>
                  <a
                    href='https://github.com/arunharshan'
                    class='float-right pl-2'
                  >
                    <img
                      width='25'
                      height='25'
                      alt='GitHub'
                      src='http://localhost:1337/uploads/3e54867b679a4f55bd22a36765f6f6a2.png'
                    />
                  </a>
                  <a
                    href='https://www.instagram.com/arunharshan/'
                    class='float-right'
                  >
                    <img
                      width='25'
                      height='25'
                      alt='Instagram'
                      src='http://localhost:1337/uploads/706e282261c043daa927bdc86cb89a84.png'
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td style='border-top: 0;'>&nbsp;</td>
                <td class='text-right' style='border-top: 0;'>
                  Arun Harshan
                </td>
              </tr>
              <tr>
                <td style='border-top: 0;'>&nbsp;</td>
                <td class='text-right' style='border-top: 0;'>
                  A web developer from Dallas, Texas USA
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
};

export default OrderConfirmationEmail;
