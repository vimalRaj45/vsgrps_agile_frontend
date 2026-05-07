import axios from 'axios';
//https://vsgrps-agile-backend.onrender.com/
const API_URL = import.meta.env.VITE_API_URL || 'https://vsgrps-agile-backend.onrender.com';

console.log('🚀 Connecting to Backend at:', API_URL);

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add JWT token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // We'll let the AuthContext handle 401s by updating the user state
    return Promise.reject(error);
  }
);

export default client;

