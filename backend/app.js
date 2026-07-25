// ============================================
// app.js - Main Express Server Entry Point
// ============================================
// This is where everything comes together.
// Think of this file as the "control center" that:
// 1. Loads environment variables
// 2. Connects to the database
// 3. Sets up middleware (security, parsing, CORS)
// 4. Registers all routes
// 5. Starts the server
//
// Request Flow:
// Client Request → CORS → Helmet → JSON Parser → Routes → Controller → Response
//                                                      ↓ (if error)
//                                               Error Handler → Response
// ============================================

// ------ 1. LOAD ENVIRONMENT VARIABLES ------
// dotenv loads variables from .env file into process.env
// This MUST be called before anything else that uses env vars
import "dotenv/config";

// ------ 2. IMPORT DEPENDENCIES ------
import express from "express"; // Web framework for Node.js
import cors from "cors"; // Enables Cross-Origin Resource Sharing

// ------ 3. IMPORT PROJECT MODULES ------
import connectDB from "./config/db.js";
import securityMiddleware from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/healthRoutes.js";
import xssRoutes from "./routes/xssRoutes.js";

// ------ 4. INITIALIZE EXPRESS APP ------
const app = express();
const PORT = process.env.PORT || 5000;

// ------ 5. CONNECT TO DATABASE ------
// We call this before starting the server so the DB is ready
connectDB();

// ============================================
// 6. MIDDLEWARE SETUP
// ============================================
// Middleware runs in ORDER for every request.
// Think of it as a pipeline: each middleware processes
// the request before passing it to the next one.

/**
 * CORS (Cross-Origin Resource Sharing)
 * Why? Our React frontend runs on localhost:5173 (Vite default)
 * but the backend runs on localhost:5000. Browsers block
 * cross-origin requests by default for security.
 * CORS allows our frontend to communicate with the backend.
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and auth headers
  })
);

/**
 * Helmet Security Headers
 * Adds various HTTP headers to protect against common attacks.
 * See middleware/security.js for detailed configuration.
 */
app.use(securityMiddleware());

/**
 * JSON Body Parser
 * Why? When the frontend sends data (e.g., a comment form),
 * it sends it as JSON. This middleware parses the JSON body
 * and makes it available as req.body.
 * Limit: 10kb prevents attackers from sending huge payloads.
 */
app.use(express.json({ limit: "10kb" }));

/**
 * URL-Encoded Body Parser
 * Why? Some forms send data in URL-encoded format instead of JSON.
 * extended: true allows nested objects in the form data.
 */
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ============================================
// 7. ROUTE REGISTRATION
// ============================================
// Each route file handles a specific feature area.
// The first argument is the base path prefix.

// Health check - GET /api/health
app.use("/api/health", healthRoutes);

// XSS demonstrations - /api/xss/*
app.use("/api/xss", xssRoutes);

// ============================================
// 8. ERROR HANDLING
// ============================================
// These MUST be registered AFTER all routes.
// Express processes middleware in order, so error handlers
// need to be last to catch errors from any route.

// Handle requests to undefined routes (404)
app.use(notFoundHandler);

// Global error handler - catches all errors
app.use(errorHandler);

// ============================================
// 9. START THE SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n🚀 XSS Learning Lab Backend`);
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📚 XSS Demos: http://localhost:${PORT}/api/xss\n`);
});

export default app;
