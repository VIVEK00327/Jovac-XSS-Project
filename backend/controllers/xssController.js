// ============================================
// xssController.js - Business Logic for XSS Endpoints
// ============================================
// Why separate controllers from routes?
// Routes define the URL paths and HTTP methods.
// Controllers contain the actual logic that runs when
// a route is hit. This separation keeps code organised
// and testable.
//
// Current endpoints:
//   GET /api/xss            → getXssDemo   (overview)
//   GET /api/xss/reflected  → getReflectedXss
//
// Future endpoints (Phases 4 & 5):
//   GET/POST /api/xss/stored
//   GET      /api/xss/dom
// ============================================

import { HTTP_STATUS } from "../utils/constants.js";

/**
 * GET /api/xss
 * Overview of all XSS demonstration endpoints.
 * Returns a map of all available XSS routes.
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
 * ----------------------
 * Returns educational metadata about Reflected XSS:
 *   • A plain-language description of the attack
 *   • The attack flow (step-by-step)
 *   • Example payloads a learner can try
 *   • Prevention techniques
 *
 * NOTE: No database connection required for this route.
 * The demo rendering (vulnerable vs secure) is handled
 * entirely in the React frontend — this endpoint exists
 * for future expansion (e.g. server-side reflection demo,
 * logging of attempted payloads, etc.).
 */
export const getReflectedXss = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",

    // Human-readable name of this XSS type
    type: "Reflected XSS",

    // Short description for display in the UI
    description:
      "Reflected XSS occurs when an application immediately " +
      "returns user-supplied input in its HTTP response without " +
      "sanitisation. The malicious payload is never stored; it " +
      "travels from the attacker's crafted URL directly into the " +
      "victim's browser.",

    // Step-by-step attack flow
    attackFlow: [
      "Attacker crafts a URL containing a malicious payload",
      "Victim clicks the URL (or is redirected to it)",
      "Application reads the payload from the request",
      "Application reflects the payload in the HTML response",
      "Browser parses and executes the injected script",
    ],

    // Sample payloads learners can test in the frontend
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

    // Prevention techniques
    prevention: [
      "Output encoding — escape <, >, &, \", ' before inserting into HTML",
      "Content-Security-Policy (CSP) header to restrict script sources",
      "Use framework-safe rendering (e.g. React JSX text nodes)",
      "Validate and allowlist server-side input",
      "HttpOnly cookies to prevent JavaScript access to session tokens",
    ],

    // Phase 4 / 5 expansion notes (not yet implemented)
    futureExpansion: {
      serverSideReflection:
        "Add a /api/xss/reflected/vulnerable endpoint that intentionally " +
        "returns raw query-param content in HTML for server-rendered demo.",
      payloadLogging:
        "Log attempted XSS payloads to MongoDB for analytics / reporting.",
      rateLimit:
        "Enforce rate-limiting on /api/xss/* to prevent abuse.",
    },
  });
};
