// ============================================
// xssRoutes.js — XSS Demonstration Routes
// ============================================
// Why separate route files?
// Instead of defining all routes in app.js, we organise
// them by feature area. This makes the codebase scalable
// and easy to navigate.
//
// Route map (base path: /api/xss):
//
//   GET  /                         → Overview of all XSS endpoints
//
//   — Reflected XSS (Phase 3) —
//   GET  /reflected                → Educational metadata
//
//   — Stored XSS (Phase 4) —
//   GET    /stored/comments        → Fetch all stored comments
//   POST   /stored/vulnerable      → Submit comment WITHOUT sanitisation
//   POST   /stored/secure          → Submit comment WITH HTML escaping
//   DELETE /stored/comments        → Clear comments (?type=vulnerable|secure)
//
//   — DOM XSS (Phase 5 — not yet added) —
//   GET  /dom                      → TBD
// ============================================

import { Router } from "express";
import {
  getXssDemo,
  getReflectedXss,
  getStoredComments,
  postVulnerableComment,
  postSecureComment,
  clearComments,
} from "../controllers/xssController.js";

const router = Router();

// ─────────────────────────────────────────────
// Overview
// ─────────────────────────────────────────────

/**
 * GET /api/xss
 * Returns a directory of all available XSS demo routes.
 */
router.get("/", getXssDemo);

// ─────────────────────────────────────────────
// Reflected XSS  (Phase 3)
// ─────────────────────────────────────────────

/**
 * GET /api/xss/reflected
 * Educational metadata: description, attack flow,
 * sample payloads, and prevention techniques.
 * No database required.
 */
router.get("/reflected", getReflectedXss);

// ─────────────────────────────────────────────
// Stored XSS  (Phase 4)
// ─────────────────────────────────────────────

/**
 * GET /api/xss/stored/comments
 * Fetch all comments from MongoDB (both panels combined).
 * The frontend filters by `type` field to separate panels.
 */
router.get("/stored/comments", getStoredComments);

/**
 * POST /api/xss/stored/vulnerable
 * Body: { username, content }
 *
 * Stores the comment AS-IS — no sanitisation performed.
 * Simulates a real-world insecure backend that trusts
 * user input directly.  When the frontend renders this
 * comment with dangerouslySetInnerHTML, any XSS payload
 * in `content` executes in the reader's browser.
 *
 * WARNING: Intentionally vulnerable — for education only.
 */
router.post("/stored/vulnerable", postVulnerableComment);

/**
 * POST /api/xss/stored/secure
 * Body: { username, content }
 *
 * Sanitises the comment (HTML entity escaping) BEFORE
 * writing to MongoDB.  Even if the frontend mistakenly
 * uses dangerouslySetInnerHTML, the escaped content is
 * safe plain text.
 */
router.post("/stored/secure", postSecureComment);

/**
 * DELETE /api/xss/stored/comments
 * Query: ?type=vulnerable|secure (optional — omit to clear all)
 *
 * Removes comments from MongoDB so learners can reset the
 * demo and try fresh payloads.
 */
router.delete("/stored/comments", clearComments);

export default router;
