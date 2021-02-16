import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: 'http://localhost:9003/api'
});

export const clientAxios = axios.create({
  baseURL: 'http://localhost:9001/api'
});

// just for illustration
clientAxios.interceptors.response.use(
  (res) => res,
  (e) => {
    console.log('-----> from axios interceptor: ', e.message);
    throw new Error(e.message);
  }
);
