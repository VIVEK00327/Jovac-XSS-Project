// ============================================
// xssRoutes.js - XSS Demonstration Routes
// ============================================
// Why separate route files?
// Instead of defining all routes in app.js, we organize
// them into separate files by feature. This makes the
// codebase scalable and easy to navigate.
//
// This file will contain routes for all 3 XSS types:
// 1. Reflected XSS  -> /api/xss/reflected
// 2. Stored XSS     -> /api/xss/stored
// 3. DOM-based XSS  -> /api/xss/dom
// ============================================

import { Router } from "express";
import { getXssDemo } from "../controllers/xssController.js";

const router = Router();

/**
 * GET /api/xss
 * Overview of all XSS demonstration endpoints.
 * Individual attack routes will be added in future steps.
 */
router.get("/", getXssDemo);

export default router;
