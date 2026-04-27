import axios from 'axios';
//https://vsgrps-agile-backend.onrender.com/
const client = axios.create({
  baseURL: 'https://vsgrps-agile-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle 401 errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // We'll let the AuthContext handle 401s by updating the user state
    return Promise.reject(error);
  }
);

export default client;

