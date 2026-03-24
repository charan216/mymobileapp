import axios from 'axios';

const BASE_URL = 'https://api.example.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default apiClient;
