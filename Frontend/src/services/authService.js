
import axios from 'axios';
const API_URL = 'http://localhost:5050';
const axiosInstance = axios.create({
  baseURL:API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
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
  },

//   changePassword: (credentials, token) => {
//     return axiosInstance.put('auth/profile', credentials, {
//       headers: authHeader(token),
//     });
//   },
};
