// ============================================
// xssRoutes.js — XSS Demonstration Routes
// ============================================
// Why separate route files?
// Instead of defining all routes in app.js, we organise
// them into separate files by feature area. This makes the
// codebase scalable and easy to navigate.
//
// Route map (base path: /api/xss):
//   GET  /              → Overview of all XSS endpoints
//   GET  /reflected     → Reflected XSS educational info  ← Phase 3
//   GET  /stored        → Stored XSS info     (Phase 4 — not yet added)
//   GET  /dom           → DOM XSS info        (Phase 5 — not yet added)
// ============================================

import { Router } from "express";
import {
  getXssDemo,
  getReflectedXss,
} from "../controllers/xssController.js";

const router = Router();

/**
 * GET /api/xss
 * ─────────────────────────────────────────────
 * Overview endpoint — returns a list of all
 * available XSS demonstration routes.
 *
 * Response example:
 *   {
 *     "status": "success",
 *     "message": "XSS demonstration endpoints will be available here",
 *     "endpoints": {
 *       "reflected": "/api/xss/reflected",
 *       "stored": "/api/xss/stored",
 *       "domBased": "/api/xss/dom"
 *     }
 *   }
 */
router.get("/", getXssDemo);

/**
 * GET /api/xss/reflected
 * ─────────────────────────────────────────────
 * Reflected XSS educational endpoint (Phase 3).
 *
 * Returns:
 *   • Type name and description
 *   • Step-by-step attack flow
 *   • Sample XSS payloads for testing
 *   • Prevention techniques
 *   • Future expansion notes
 *
 * No database connection required — data is static.
 *
 * Future phases will add:
 *   POST /api/xss/reflected/simulate  — server-side reflection demo
 */
router.get("/reflected", getReflectedXss);

export default router;
