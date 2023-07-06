import axios from 'axios';

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';

    return request;
  },
  null,
  { synchronous: true }
);

axiosClient.interceptors.response.use(
    (response) =>
      response?.data,
    (error) => {
      return Promise.reject(error.response.data);
    }
  );

axiosClient.defaults.baseURL = 'https://blog-app-server-hwy8-byck7ei78-priyansh19csu225.vercel.app'; 
  
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

axiosClient.defaults.timeout = 60000;

export default axiosClient;
