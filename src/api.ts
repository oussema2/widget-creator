import axios from "axios";
import { API_URL } from "./lib/constants";

const api = axios.create({
  baseURL: API_URL, // Set your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor to attach tokens or other headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle responses and errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., logout, redirect, etc.)
      console.error("Unauthorized, logging out...");
    }
    return Promise.reject(error);
  }
);

export default api;
