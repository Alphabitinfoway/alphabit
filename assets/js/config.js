const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === ''
);

const BASE_URL = isLocalhost
    ? 'http://localhost:3000'
    : 'https://alphabit-web-3.onrender.com';
