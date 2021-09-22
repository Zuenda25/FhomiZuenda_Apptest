import axios from 'axios';

const host = 'https://simple-contact-crud.herokuapp.com/';

const instance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => config,
  (err) => Promise.reject(err),
);

export default instance;
