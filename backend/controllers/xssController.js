// ============================================
// xssController.js - Business Logic for XSS Endpoints
// ============================================
// Why separate controllers from routes?
// Routes define the URL paths and HTTP methods.
// Controllers contain the actual logic that runs when
// a route is hit. This separation keeps code organised
// and testable.
//
// Endpoints:
//   GET  /api/xss                        → getXssDemo
//   GET  /api/xss/reflected              → getReflectedXss
//
//   — Stored XSS (Phase 4) —
//   GET    /api/xss/stored/comments      → getStoredComments
//   POST   /api/xss/stored/vulnerable    → postVulnerableComment
//   POST   /api/xss/stored/secure        → postSecureComment
//   DELETE /api/xss/stored/comments      → clearComments
// ============================================

import { HTTP_STATUS } from "../utils/constants.js";
import Comment from "../models/Comment.js";

// ─────────────────────────────────────────────────────────────────
// REFLECTED XSS controllers
// ─────────────────────────────────────────────────────────────────

/**
 * GET /api/xss
 * Overview endpoint — returns a map of all available XSS routes.
 */
export const getXssDemo = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "XSS demonstration endpoints will be available here",
    endpoints: {
      reflected: "/api/xss/reflected",
      stored: "/api/xss/stored",
      domBased: "/api/xss/dom",
    },
  });
};

/**
 * GET /api/xss/reflected
 * Returns educational metadata about Reflected XSS.
 * No database connection required.
 */
export const getReflectedXss = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    type: "Reflected XSS",
    description:
      "Reflected XSS occurs when an application takes user-supplied data " +
      "(e.g. from a URL query parameter or form field) and immediately " +
      '"reflects" it back in the HTTP response without proper sanitisation. ' +
      "The malicious payload is not stored — it travels from the victim's " +
      "request straight into their browser.",
    attackFlow: [
      "Attacker crafts a URL containing a malicious payload",
      "Victim clicks the URL (or is redirected to it)",
      "Application reads the payload from the request",
      "Application reflects the payload in the HTML response",
      "Browser parses and executes the injected script",
    ],
    samplePayloads: [
      { label: "Basic alert", payload: "<script>alert('XSS!')</script>" },
      {
        label: "Image onerror",
        payload: "<img src=x onerror=\"alert('XSS!')\">",
      },
      {
        label: "Cookie theft simulation",
        payload: "<script>alert(document.cookie)</script>",
      },
    ],
    prevention: [
      "Output encoding — escape <, >, &, \", ' before inserting into HTML",
      "Content-Security-Policy (CSP) header to restrict script sources",
      "Use framework-safe rendering (e.g. React JSX text nodes)",
      "Validate and allowlist server-side input",
      "HttpOnly cookies to prevent JavaScript access to session tokens",
    ],
    futureExpansion: {
      serverSideReflection:
        "Add a /api/xss/reflected/vulnerable endpoint that intentionally " +
        "returns raw query-param content in HTML for server-rendered demo.",
      payloadLogging:
        "Log attempted XSS payloads to MongoDB for analytics / reporting.",
      rateLimit: "Enforce rate-limiting on /api/xss/* to prevent abuse.",
    },
  });
};

// ─────────────────────────────────────────────────────────────────
// STORED XSS controllers
// ─────────────────────────────────────────────────────────────────

/**
 * GET /api/xss/stored/comments
 * ─────────────────────────────────────────────
 * Fetch ALL stored comments from MongoDB.
 * Both the vulnerable and secure panels read from
 * this same collection — the difference is only in
 * how the frontend RENDERS the content.
 *
 * The `type` field on each comment indicates which
 * panel stored it: "vulnerable" or "secure".
 */
export const getStoredComments = async (req, res) => {
  try {
    // Sort newest-first so the latest comment appears at the top
    const comments = await Comment.find().sort({ createdAt: -1 }).lean();

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      count: comments.length,
      comments,
    });
  } catch (error) {
    const err = new Error("Failed to fetch comments");
    err.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
};

/**
 * POST /api/xss/stored/vulnerable
 * ─────────────────────────────────────────────
 * Accepts a comment and stores it AS-IS — no sanitisation.
 *
 * WHY deliberately skip sanitisation?
 *   This simulates a real-world vulnerable backend that trusts
 *   user input and writes it directly to the database.  When
 *   the frontend fetches this comment and renders it with
 *   dangerouslySetInnerHTML, any injected <script> or event
 *   handler executes in the reader's browser.
 *
 * WARNING: This is intentionally insecure for educational purposes.
 *          NEVER skip sanitisation in production code.
 *
 * Body: { username: string, content: string }
 */
export const postVulnerableComment = async (req, res) => {
  const { username, content } = req.body;

  // Basic presence check — but NO sanitisation of the values
  if (!username || !content) {
    const err = new Error("Username and content are required");
    err.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  // ⚠️ VULNERABLE: raw user input written directly to MongoDB
  // The `content` field may contain XSS payloads like:
  //   <script>alert('XSS!')</script>
  //   <img src=x onerror="alert(document.cookie)">
  const comment = await Comment.create({
    username: username,   // stored raw — no escaping
    content: content,     // stored raw — no escaping
    type: "vulnerable",   // tag this comment as from the vulnerable panel
  });

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    message:
      "Comment stored without sanitisation — raw payload saved to database",
    comment,
  });
};

/**
 * POST /api/xss/stored/secure
 * ─────────────────────────────────────────────
 * Accepts a comment, sanitises it server-side, then stores it.
 *
 * SANITISATION APPROACH (without external libraries):
 *   We replace the five dangerous HTML characters with their
 *   named entity equivalents before writing to the database.
 *   This is the minimal, dependency-free form of output encoding.
 *
 *   In a production app you would also use:
 *     • DOMPurify (client-side)
 *     • sanitize-html / xss (server-side npm packages)
 *     • A strict Content-Security-Policy header
 *
 * Body: { username: string, content: string }
 */
export const postSecureComment = async (req, res) => {
  const { username, content } = req.body;

  if (!username || !content) {
    const err = new Error("Username and content are required");
    err.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  /**
   * escapeHtml — converts dangerous HTML characters to safe entities.
   *
   * Character → Entity mapping:
   *   &  → &amp;   (must be first to avoid double-encoding)
   *   <  → &lt;
   *   >  → &gt;
   *   "  → &quot;
   *   '  → &#x27;
   *
   * After escaping, <script>alert()</script> becomes the
   * literal text "&lt;script&gt;alert()&lt;/script&gt;"
   * which the browser displays as text — never executes.
   */
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")   // ① always first
      .replace(/</g, "&lt;")    // ② open tag
      .replace(/>/g, "&gt;")    // ③ close tag
      .replace(/"/g, "&quot;")  // ④ attribute double-quote
      .replace(/'/g, "&#x27;"); // ⑤ attribute single-quote

  // ✅ SECURE: sanitised before writing to MongoDB
  const safeUsername = escapeHtml(username.trim());
  const safeContent  = escapeHtml(content.trim());

  const comment = await Comment.create({
    username: safeUsername,
    content: safeContent,
    type: "secure",
  });

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    message: "Comment sanitised and stored safely",
    original: { username, content },      // show original for comparison
    sanitised: { username: safeUsername, content: safeContent },
    comment,
  });
};

/**
 * DELETE /api/xss/stored/comments
 * ─────────────────────────────────────────────
 * Clears ALL stored comments from MongoDB.
 * Accepts an optional `?type=vulnerable|secure` query param
 * to delete only one panel's comments.
 *
 * Query params:
 *   ?type=vulnerable  — delete only vulnerable comments
 *   ?type=secure      — delete only secure comments
 *   (none)            — delete all comments
 */
export const clearComments = async (req, res) => {
  const { type } = req.query;

  // Build the filter — delete by type if provided, else delete all
  const filter = type ? { type } : {};

  const result = await Comment.deleteMany(filter);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: type
      ? `Cleared all ${type} comments`
      : "Cleared all comments",
    deletedCount: result.deletedCount,
  });
};
