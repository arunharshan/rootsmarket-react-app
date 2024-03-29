/* eslint-disable */
import React, { useState, useEffect } from 'react';

const ReactStripe = ({
  children,
  uniqueId = 'stripe-js',
  script = 'https://js.stripe.com/v3/',
  loader = 'Loading...'
}) => {
  const [stripeLoaded, setStripeLoaded] = useState({});
  useEffect(() => {
    const loadScript = (src, uniqueId) =>
      new Promise((resolve, reject) => {
        const scriptElement = document.getElementById(uniqueId);

        if (!scriptElement) {
          const script = document.createElement('script');
          script.src = src;
          script.id = uniqueId;

          const handleLoadScriptSuccess = () => resolve({ successful: true });
          const handleLoadScriptFail = event => reject({ error: event });

          script.addEventListener('load', handleLoadScriptSuccess, {
            once: true
          });
          script.addEventListener('error', handleLoadScriptFail, {
            once: true
          });
          document.head.appendChild(script);
        } else {
          resolve({ successful: true });
        }
      });
    const fetchData = async () => {
      const result = await loadScript(script, uniqueId);
      setStripeLoaded(result);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return stripeLoaded.successful ? children : loader;
};
export default ReactStripe;
