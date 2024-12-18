import axios from "axios";

// Create an Axios instance with default configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api/", // Replace with your backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token to the request headers
API.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // If token is invalid or expired, redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;
