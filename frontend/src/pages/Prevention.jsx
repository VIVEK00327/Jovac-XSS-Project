/**
 * Prevention.jsx — Secure Coding Practices Learning Page
 * ========================================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Explains essential defense mechanisms against Cross-Site Scripting
 * complete with code snippets, best practices, and explanations.
 *
 * Location: src/pages/Prevention.jsx
 */

import { useState } from "react";
import { HiShieldCheck, HiCode, HiInformationCircle, HiChevronDown } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

const Prevention = () => {
  const [activeAccordion, setActiveAccordion] = useState("encoding");

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const preventions = [
    {
      id: "validation",
      title: "Input Validation",
      icon: HiShieldCheck,
      whyItMatters: "Input validation ensures the application only accepts properly formatted data. It acts as the first line of defense, reducing the attack surface by rejecting malformed payloads before they reach controllers or storage.",
      bestPractices: [
        "Use strict allowlists (define exact formats allowed, e.g. alphanumeric only) instead of denylists.",
        "Validate content lengths, data types, and bounds.",
        "Use standard schemas or validator packages (e.g. validator.js or Joi)."
      ],
      commonMistakes: [
        "Attempting to filter or replace dangerous characters using custom regex (attackers always bypass this).",
        "Trusting client-side validation alone (always validate on the backend)."
      ],
      codeSnippet: `// SECURE BACKEND INPUT VALIDATION (Node.js/Express)
import { body, validationResult } from 'express-validator';

export const validateComment = [
  body('username')
    .trim()
    .isAlphanumeric().withMessage('Username must be alphanumeric')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be 3-20 chars'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage('Comment must not exceed 500 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];`
    },
    {
      id: "encoding",
      title: "Output Encoding",
      icon: HiCode,
      whyItMatters: "Output encoding translates dangerous markup control characters (like <, >, &) into safe string equivalents (HTML entities) before they are rendered in the HTML context. This prevents the browser from interpreting user data as executable code.",
      bestPractices: [
        "Escape all variables placed in HTML bodies (& -> &amp;, < -> &lt;, > -> &gt;, \" -> &quot;, ' -> &#x27;).",
        "Use context-aware encoding depending on where the data is outputted (HTML element, HTML attribute, JS variable, CSS rule, URL parameter).",
        "Let framework-safe templates (like React JSX curly bindings or Angular templates) handle encoding automatically."
      ],
      commonMistakes: [
        "Using dangerouslySetInnerHTML in React or v-html in Vue with raw user input.",
        "Encoding data on input/storage instead of encoding it at the point of output rendering."
      ],
      codeSnippet: `// HTML ENTITY ENCODING FUNCTION
const escapeHtml = (str) => {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;"); // Escape forward slash
};

// Safe rendering template usage
const userComment = escapeHtml(inputContent);
outputDiv.innerHTML = \`<p>\${userComment}</p>\`;`
    },
    {
      id: "dom-apis",
      title: "Safe DOM APIs",
      icon: HiInformationCircle,
      whyItMatters: "DOM-based XSS vulnerabilities happen entirely client-side when user data is written unsafely into DOM nodes. Selecting safe APIs prevents raw inputs from invoking the browser's HTML parser.",
      bestPractices: [
        "Always prefer textContent or innerText instead of innerHTML when writing plain text to elements.",
        "Use safe assignment properties like element.className or element.setAttribute() instead of concatenating strings directly into HTML.",
        "Sanitise dynamic HTML content using standard sanitisation libraries like DOMPurify."
      ],
      commonMistakes: [
        "Writing query parameters (location.search) or URL hashes (location.hash) directly to document.write() or innerHTML.",
        "Passing raw string values to timer sinks like setTimeout('alert(' + input + ')')."
      ],
      codeSnippet: `// SAFE VS UNSAFE CLIENT-SIDE DOM WRITING
const untrustedInput = "<img src=x onerror=alert(1)>";

// ❌ UNSAFE: parses string as HTML and triggers XSS
outputContainer.innerHTML = untrustedInput;

// ✅ SECURE: writes raw tags as visible plain text
outputContainer.textContent = untrustedInput;

// ✅ SECURE (HTML required): Sanitised markup via DOMPurify
import DOMPurify from 'dompurify';
outputContainer.innerHTML = DOMPurify.sanitize(untrustedInput);`
    },
    {
      id: "csp",
      title: "Content Security Policy (CSP)",
      icon: FaLock,
      whyItMatters: "Content Security Policy is an HTTP response header that restricts the resources (scripts, stylesheets, images) the browser is allowed to load and execute on a webpage. It acts as an incredibly powerful second layer of defense, neutralizing XSS exploits even if a vulnerability exists.",
      bestPractices: [
        "Implement a strict CSP header (e.g. Content-Security-Policy: default-src 'self'; script-src 'self').",
        "Avoid using 'unsafe-inline' or 'unsafe-eval' for scripts.",
        "Use CSP nonces (unique random tokens) or hashes to verify and allow trusted inline scripts."
      ],
      commonMistakes: [
        "Using a broad wildcard (*) which allows scripts from any domain.",
        "Setting CSP in report-only mode permanently without enforcing it."
      ],
      codeSnippet: `# SECURE NGINX/HTTP HEADER FOR STRICT CSP
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com; object-src 'none'; base-uri 'self';

# Node/Express Helmet configuration
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://trustedscripts.com"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  }
}));`
    },
    {
      id: "cookies",
      title: "HttpOnly Cookies",
      icon: FaLock,
      whyItMatters: "Session cookies contain sensitive authentication tokens. If an attacker successfully executes XSS, their primary objective is often script-based session hijacking. Marking cookies as HttpOnly blocks client-side scripts from reading the token.",
      bestPractices: [
        "Always set the HttpOnly flag on authentication and session cookies.",
        "Set the Secure flag so cookies are only transmitted over encrypted (HTTPS) connections.",
        "Set the SameSite flag (Strict or Lax) to protect against Cross-Site Request Forgery (CSRF)."
      ],
      commonMistakes: [
        "Storing JSON Web Tokens (JWT) or session keys in LocalStorage/SessionStorage (which can be read by any XSS script).",
        "Leaving HttpOnly off because scripts need to perform client-side session checks."
      ],
      codeSnippet: `// SECURE COOKIE ASSIGNMENT IN EXPRESS
res.cookie('sessionId', token, {
  httpOnly: true, // ✅ Blocks JavaScript access (prevents document.cookie theft)
  secure: true,   // ✅ Only sent over HTTPS
  sameSite: 'lax', // ✅ Protects against CSRF
  maxAge: 3600000 // 1 hour expiration
});`
    },
    {
      id: "least-privilege",
      title: "Principle of Least Privilege",
      icon: HiShieldCheck,
      whyItMatters: "The principle of least privilege restricts permissions of users, service accounts, and processes to only what is strictly necessary. It limits the blast radius of a successful compromise.",
      bestPractices: [
        "Run database connections with a read/write-only user account rather than dbOwner or administrator.",
        "Minimise API scopes and roles on server instances.",
        "Do not allow the database process or Node server process to run with Root/Administrator permissions in the host OS."
      ],
      commonMistakes: [
        "Configuring the application backend to connect to MongoDB using the admin user.",
        "Giving client-side users administrative privilege fields directly in JWTs that are easily modified."
      ],
      codeSnippet: `// DATABASE USER CONFIGURATION (Least Privilege)
# Instead of connecting as root:
mongodb://admin:SuperSecretRootPassword@localhost:27017/app

# Connect as a limited user specific to comments collection:
mongodb://comment_writer:WriterPassword123@localhost:27017/xss-learning-lab`
    },
    {
      id: "trusted-types",
      title: "Trusted Types (Overview)",
      icon: HiInformationCircle,
      whyItMatters: "Trusted Types is a modern browser feature designed to systematically eradicate DOM-based XSS. It restricts the assignments of values to execution sinks (like innerHTML) to designated, validated 'Trusted Type' objects created by predefined policies.",
      bestPractices: [
        "Enable Trusted Types in your Content Security Policy (require-trusted-types-for 'script').",
        "Create custom policies using window.trustedTypes.createPolicy to sanitise strings.",
        "Transition legacy code away from string assignments in favor of Trusted Type objects."
      ],
      commonMistakes: [
        "Enabling Trusted Types in CSP without writing corresponding sanitisation policies, which crashes legacy JS scripts.",
        "Allowing policies to return raw strings without validation (bypass policy)."
      ],
      codeSnippet: `// ENABLE TRUSTED TYPES POLICY IN CLIENT SCRIPT
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // Define safety rules
  const escapePolicy = window.trustedTypes.createPolicy('myEscapePolicy', {
    createHTML: (string) => string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  });

  // ❌ Throws Type Error by browser design:
  outputContainer.innerHTML = "<script>alert(1)</script>";

  // ✅ Secure: Browser allows the sanitized TrustedHTML object
  const cleanHTML = escapePolicy.createHTML("<script>alert(1)</script>");
  outputContainer.innerHTML = cleanHTML;
}`
    },
    {
      id: "secure-coding",
      title: "Secure Coding Practices",
      icon: HiShieldCheck,
      whyItMatters: "Secure coding practices encompass the broader engineering discipline of writing code that is resistant to exploitation. Beyond individual techniques like encoding or CSP, this means adopting a security-first mindset across the entire software development lifecycle — from design reviews and threat modelling to dependency management and automated testing.",
      bestPractices: [
        "Adopt the defense-in-depth model: layer multiple security controls (validation, encoding, CSP, HttpOnly cookies) so that a bypass of one control does not compromise the application.",
        "Conduct regular code reviews with a security checklist covering injection, authentication, access control, and cryptographic weaknesses.",
        "Keep all dependencies updated and audit them regularly using tools like npm audit, Snyk, or Dependabot."
      ],
      commonMistakes: [
        "Relying on a single security control (e.g. only input validation without output encoding) which creates single points of failure.",
        "Ignoring or suppressing security warnings from dependency scanners and linters."
      ],
      codeSnippet: `// DEFENSE-IN-DEPTH EXAMPLE: LAYERED SECURITY IN EXPRESS
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import escapeHtml from 'escape-html';

// Layer 1: Security headers (CSP, X-Frame-Options, etc.)
app.use(helmet());

// Layer 2: Rate limiting to prevent abuse
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Layer 3: Input validation
app.post('/comment', body('text').trim().isLength({ max: 500 }));

// Layer 4: Output encoding at render time
const safeText = escapeHtml(userInput);`
    }
  ];

  return (
    <div className="prev-page animate-fade-in">
      {/* Header */}
      <header className="prev-header">
        <div className="prev-header__inner">
          <div className="prev-header__icon">
            <HiShieldCheck />
          </div>
          <div>
            <h1 className="prev-header__title">Secure Coding Practices</h1>
            <p className="prev-header__subtitle">
              Comprehensive reference and engineering guide to prevent Cross-Site Scripting
            </p>
          </div>
        </div>
      </header>

      {/* Accordion Container */}
      <section className="prev-accordion-list">
        {preventions.map((item) => {
          const Icon = item.icon;
          const isOpen = activeAccordion === item.id;

          return (
            <div
              key={item.id}
              className={`prev-accordion-item ${isOpen ? "prev-accordion-item--open" : ""}`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                className="prev-accordion-header"
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={isOpen}
              >
                <span className="prev-accordion-header__title">
                  <Icon className="prev-accordion-header__icon" />
                  {item.title}
                </span>
                <HiChevronDown className="prev-accordion-header__chevron" />
              </button>

              {/* Accordion Content */}
              <div className="prev-accordion-content">
                <div className="prev-accordion-content__inner">
                  <div className="prev-details-grid">
                    {/* Left: Text details */}
                    <div className="prev-details-info">
                      <div className="prev-details-block">
                        <h4>Explanation & Why It Matters</h4>
                        <p>{item.whyItMatters}</p>
                      </div>

                      <div className="prev-details-block">
                        <h4>Best Practices</h4>
                        <ul className="prev-list prev-list--check">
                          {item.bestPractices.map((bp, i) => (
                            <li key={i}>{bp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="prev-details-block">
                        <h4>Common Mistakes</h4>
                        <ul className="prev-list prev-list--error">
                          {item.commonMistakes.map((cm, i) => (
                            <li key={i}>{cm}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Code Block */}
                    <div className="prev-details-code">
                      <div className="sxss-code">
                        <div className="sxss-code__bar">
                          <span className="sxss-code__dot" style={{ background: "var(--accent-green)" }} />
                          <span className="sxss-code__file-name">Example Implementation</span>
                        </div>
                        <pre className="sxss-code__pre">
                          <code>{item.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Prevention;
