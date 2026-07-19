// ============================================
// healthRoutes.js - Server Health Check Routes
// ============================================
// Why a health check endpoint?
// Health checks are used to verify the server is running.
// They're essential for:
// 1. Monitoring tools to check if the server is alive
// 2. Load balancers to know if this server can accept traffic
// 3. Developers to quickly test if the backend is working
// ============================================

import { Router } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS, MESSAGES } from "../utils/constants.js";

const router = Router();

/**
 * GET /api/health
 * Returns server status and basic system information.
 */
router.get("/", (req, res) => {
  // Map Mongoose connection states to readable strings
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: MESSAGES.SERVER_RUNNING,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: dbStates[mongoose.connection.readyState] || "unknown",
  });
});

export default router;
