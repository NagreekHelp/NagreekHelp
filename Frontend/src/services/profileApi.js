import axios from 'axios';

const API_URL =  'http://localhost:5050/';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header for authenticated requests
const authHeader = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const profileApi = {
  getUserProfile: ( token) => {
    return axiosInstance.get('profile',{
      headers: authHeader(token)
    }); 
  },
}