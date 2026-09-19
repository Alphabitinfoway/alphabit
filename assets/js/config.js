// `file://` pages have an empty hostname, but they are not a local API server.
// Use the deployed API when an HTML file is opened directly from disk.
const isLocalhost = window.location.protocol !== 'file:' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

const BASE_URL = isLocalhost
    ? 'http://localhost:3000'
    : 'https://alphabit-web-3.onrender.com';
