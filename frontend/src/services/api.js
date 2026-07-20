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

// Create an Axios instance with default settings
const api = axios.create({
  // Base URL of our Express backend server
  baseURL: "http://localhost:5000/api",

  // Default headers sent with every request
  headers: {
    "Content-Type": "application/json",
  },

  // Timeout after 10 seconds to avoid hanging requests
  timeout: 10000,
});

export default api;
