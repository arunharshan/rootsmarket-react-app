const AUTH_KEY = 'jwt';
const ROOTS_CART = 'roots_market_cart';
const GUEST_ID = 'guest_id';

export const setGuestId = (key = GUEST_ID) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(new Date()));
  }
};
export const getGuestId = (key = GUEST_ID) => {
  if (localStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const removeGuestId = (key = GUEST_ID) => {
  if (localStorage && localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};

export const setAuth = (value, key = AUTH_KEY) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getAuth = (key = AUTH_KEY) => {
  if (localStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const removeAuth = (key = AUTH_KEY) => {
  if (localStorage && localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};

// setup a cart for user
export const setLocalCart = (value, key = ROOTS_CART) => {
  if (localStorage && value) {
    if (JSON.stringify(value) !== 'undefined') {
      if (JSON.stringify(value).startsWith('[')) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, JSON.stringify([value]));
      }
    } else {
      localStorage.setItem(key, []);
    }
  }
};

export const getLocalCart = (key = ROOTS_CART) => {
  if (localStorage && localStorage.getItem(key)) {
    if (localStorage.getItem(key) !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return [];
    }
  }
  return [];
};

export const removeLocalCart = (key = ROOTS_CART) => {
  if (localStorage && localStorage.getItem(key)) {
    if (
      localStorage.getItem(key) !== null ||
      localStorage.getItem(key) !== 'undefined'
    ) {
      localStorage.removeItem(key);
    }
  }
};

export const currentDate = () => {
  let tempDate = new Date();
  const date =
    tempDate.getMonth() +
    1 +
    '/' +
    tempDate.getDate() +
    '/' +
    tempDate.getFullYear();
  return date;
};

export const currentYear = () => {
  return new Date().getFullYear();
};

export const isMobile = () => {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
};

export const baseUrl =
  window.location.href.indexOf('herokuapp.com') != -1
    ? 'https://rootsmarket-strapi-cms.herokuapp.com'
    : 'http://localhost:1337';

export const baseUrlApp =
  window.location.href.indexOf('herokuapp.com') != -1
    ? 'http://rootsmarket.herokuapp.com'
    : 'http://localhost:3000';

// Need to rework on the env's

// for database
// export const baseUrl =
//   process.env.NODE_ENV == 'production'
//     ? 'https://rootsmarket-strapi-cms.herokuapp.com'
//     : 'http://localhost:1337';

//for react app
// export const baseUrlApp =
//   process.env.NODE_ENV == 'production'
//     ? 'http://rootsmarket.herokuapp.com'
//     : 'http://localhost:3000';
