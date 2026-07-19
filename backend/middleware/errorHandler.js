// ============================================
// errorHandler.js - Global Error Handling Middleware
// ============================================
// Why a global error handler?
// Without this, unhandled errors would crash the server
// or send ugly default error messages to the client.
// This middleware catches ALL errors and sends a clean,
// consistent JSON response.
//
// How Express error middleware works:
// Express recognizes middleware with 4 parameters (err, req, res, next)
// as error-handling middleware. It MUST have all 4 parameters.
// ============================================

import { HTTP_STATUS, MESSAGES } from "../utils/constants.js";

/**
 * Global error handling middleware.
 * Catches any error thrown or passed via next(error) in the app.
 *
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function (required for Express to recognize this as error middleware)
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging (server-side only)
  console.error(`❌ Error: ${err.message}`);
  console.error(`📍 Path: ${req.method} ${req.originalUrl}`);

  // In development, log the full stack trace for easier debugging
  if (process.env.NODE_ENV === "development") {
    console.error(`🔍 Stack: ${err.stack}`);
  }

  // Determine the status code
  // If the error already has a status code, use it; otherwise default to 500
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  // Send a clean JSON error response
  res.status(statusCode).json({
    status: "error",
    message: err.message || MESSAGES.SERVER_ERROR,
    // Only include the stack trace in development for security reasons
    // In production, stack traces can leak sensitive information
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler.
 * This catches any request that doesn't match a defined route.
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`${MESSAGES.NOT_FOUND}: ${req.originalUrl}`);
  error.statusCode = HTTP_STATUS.NOT_FOUND;

  // Pass the error to the global error handler
  next(error);
};

export { errorHandler, notFoundHandler };
