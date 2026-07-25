/**
 * api.js — Axios Service Configuration
 * ======================================
 * This file creates a reusable Axios instance pre-configured
 * with the backend base URL.  Every API call throughout the app
 * should import this instance instead of the raw `axios` library
 * so the base URL and any shared headers/interceptors are
 * automatically applied.
 *
 * Location: src/services/api.js
 */

import axios from "axios";

// Determine the API base URL based on environment variables or current window hostname
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    return `http://${hostname}:5000/api`;
  }
  return "http://localhost:5000/api";
};

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: getBaseURL(),

  // Default headers sent with every request
  headers: {
    "Content-Type": "application/json",
  },

  // Timeout after 10 seconds to avoid hanging requests
  timeout: 10000,
});

export default api;
