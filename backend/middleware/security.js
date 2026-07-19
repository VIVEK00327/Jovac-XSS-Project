// ============================================
// security.js - Security Middleware Configuration
// ============================================
// Why Helmet?
// Helmet sets various HTTP security headers to protect
// against common web vulnerabilities like:
// - XSS (Cross-Site Scripting)
// - Clickjacking
// - MIME type sniffing
// - And more...
//
// IMPORTANT FOR THIS PROJECT:
// Since this is an XSS Learning Lab, we configure Helmet
// carefully. Some protections are intentionally relaxed
// on vulnerable endpoints so students can see attacks work.
// Secure endpoints will have full protection enabled.
// ============================================

import helmet from "helmet";

/**
 * Creates and returns the Helmet security middleware.
 *
 * For the learning lab, we use a balanced configuration:
 * - Content Security Policy (CSP) is set to report-only mode
 *   so it doesn't block XSS demos but still shows what it would block
 * - Other protections remain active for baseline security
 */
const securityMiddleware = () => {
  return helmet({
    // Content Security Policy - controls which resources can be loaded
    // Set to false for now; we'll configure per-route CSP later
    // when we implement secure vs vulnerable endpoints
    contentSecurityPolicy: false,

    // Prevents the browser from MIME-sniffing (guessing content types)
    noSniff: true,

    // Hides the "X-Powered-By: Express" header
    // Why? Attackers use this to identify the tech stack
    hidePoweredBy: true,

    // Protects against clickjacking by setting X-Frame-Options
    frameguard: { action: "deny" },
  });
};

export default securityMiddleware;
