// src/services/authApi.js
import axios from 'axios';

// Set API URL from environment or fallback
// const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'https://api-gateway-run8-1-team4-api-gateway-dev.development.krci-dev.cloudmentor.academy/';
const API_URL = 'http://localhost:5050';
// const API_URL = 'https://api-gateway-9fnx.onrender.com';

const axiosInstance = axios.create({
  baseURL:API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // ✅ Add this if you’re using cookies/auth
});

// Add authorization header for authenticated requests
// const authHeader = (token) => {
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

export const authApi = {
  register: (credentials) => {
    return axiosInstance.post('/register', credentials);
  },
  login: (credentials) => {
    return axiosInstance.post('/login', credentials);
  }
//   changePassword: (credentials, token) => {
//     return axiosInstance.put('auth/profile', credentials, {
//       headers: authHeader(token),
//     });
//   },
};
