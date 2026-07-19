// ============================================
// constants.js - Central place for reusable values
// ============================================
// Why this file?
// Instead of hardcoding status codes and messages everywhere,
// we define them once here. This makes the codebase consistent
// and easy to maintain.
// ============================================

// HTTP Status Codes
// These are standard codes the server sends back to the client
export const HTTP_STATUS = {
  OK: 200,                    // Request succeeded
  CREATED: 201,               // Resource was created successfully
  BAD_REQUEST: 400,           // Client sent invalid data
  NOT_FOUND: 404,             // Requested resource doesn't exist
  INTERNAL_SERVER_ERROR: 500, // Something went wrong on the server
};

// Response Messages
// Standard messages used across API responses
export const MESSAGES = {
  SERVER_RUNNING: "XSS Learning Lab backend running",
  SERVER_ERROR: "Internal Server Error",
  NOT_FOUND: "Route not found",
  DB_CONNECTED: "MongoDB connected successfully",
  DB_ERROR: "MongoDB connection failed",
};
