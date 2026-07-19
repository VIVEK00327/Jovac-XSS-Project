// ============================================
// xssController.js - Business Logic for XSS endpoints
// ============================================
// Why separate controllers from routes?
// Routes define the URL paths and HTTP methods.
// Controllers contain the actual logic that runs when
// a route is hit. This separation keeps code organized
// and testable.
//
// For now, this file is a placeholder with basic structure.
// XSS attack and defense logic will be added here later.
// ============================================

import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Placeholder controller for XSS demonstrations.
 * Will be expanded in future steps to handle:
 * - Reflected XSS (vulnerable and secure)
 * - Stored XSS (vulnerable and secure)
 * - DOM-based XSS (vulnerable and secure)
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
