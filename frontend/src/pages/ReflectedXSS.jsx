/**
 * ReflectedXSS.jsx — Reflected XSS Learning Module
 * ==================================================
 * Phase 3 implementation of the XSS Learning Lab.
 *
 * This page is the core educational tool for Reflected XSS.
 * It renders TWO completely independent panels side-by-side:
 *
 *   LEFT  → 🔴 Vulnerable Application
 *              Uses dangerouslySetInnerHTML to deliberately
 *              reflect raw user input — exactly what an
 *              insecure server does.
 *
 *   RIGHT → 🟢 Secure Application
 *              Renders user input as plain text via React's
 *              default escaping, preventing script execution.
 *
 * Each panel has its OWN input + button so the learner can
 * compare behaviour independently.  Results are NEVER shown
 * until the button is clicked (no auto-execution).
 *
 * Location: src/pages/ReflectedXSS.jsx
 */

import { useState } from "react";
import {
  HiShieldExclamation,
  HiShieldCheck,
  HiArrowDown,
  HiCode,
  HiInformationCircle,
} from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { BiReflectHorizontal } from "react-icons/bi";
import { FaSearch, FaLock, FaUnlock } from "react-icons/fa";

// ─────────────────────────────────────────────
// Sub-component: PageHeader
// ─────────────────────────────────────────────
/**
 * Renders the top banner of the page:
 *   • Icon + "Reflected XSS" title
 *   • Short educational description
 *   • "What is Reflected XSS?" info banner
 */
const PageHeader = () => (
  <header className="rxss-header">
    {/* ---- Icon + title ---- */}
    <div className="rxss-header__top">
      <div className="rxss-header__icon-wrap">
        <BiReflectHorizontal />
      </div>
      <div>
        <h1 className="rxss-header__title">Reflected XSS</h1>
        <p className="rxss-header__subtitle">
          Interactive side-by-side comparison of vulnerable and secure
          implementations
        </p>
      </div>
    </div>

    {/* ---- Info banner ---- */}
    <div className="rxss-info-banner">
      <HiInformationCircle className="rxss-info-banner__icon" />
      <div>
        <strong>What is Reflected XSS?</strong>
        <p>
          Reflected XSS occurs when an application takes user-supplied data
          (e.g. from a URL query parameter or form field) and immediately
          "reflects" it back in the HTTP response without proper sanitisation.
          The malicious payload is not stored — it travels from the victim's
          request straight into their browser.
        </p>
      </div>
    </div>
  </header>
);

// ─────────────────────────────────────────────
// Sub-component: AttackFlow
// ─────────────────────────────────────────────
/**
 * Visual step-by-step diagram showing how Reflected XSS
 * propagates from user input to script execution.
 *
 * Props:
 *   steps  – array of { label } step objects
 *   color  – CSS variable name for the accent colour
 */
const AttackFlow = ({ steps, color }) => (
  <div className="rxss-flow">
    <h4 className="rxss-flow__title">Attack / Processing Flow</h4>
    <div className="rxss-flow__steps">
      {steps.map((step, idx) => (
        <div key={idx} className="rxss-flow__item">
          {/* Step box */}
          <div
            className="rxss-flow__step"
            style={{ borderColor: `var(${color})`, color: `var(${color})` }}
          >
            {step.label}
          </div>

          {/* Downward arrow — not shown after the last step */}
          {idx < steps.length - 1 && (
            <HiArrowDown
              className="rxss-flow__arrow"
              style={{ color: `var(${color})` }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Sub-component: CodeBlock
// ─────────────────────────────────────────────
/**
 * Renders a syntax-highlighted (monospace) code snippet
 * inside a styled terminal-like box.
 *
 * Props:
 *   title   – section heading shown above the code
 *   code    – the raw code string to display
 *   accent  – CSS variable for the top border/dot colour
 */
const CodeBlock = ({ title, code, accent }) => (
  <div className="rxss-code">
    {/* Header bar mimicking an IDE/terminal */}
    <div className="rxss-code__bar">
      <span
        className="rxss-code__dot"
        style={{ background: `var(${accent})` }}
      />
      <span className="rxss-code__file-name">{title}</span>
      <HiCode className="rxss-code__icon" />
    </div>

    {/* Code content */}
    <pre className="rxss-code__pre">
      <code>{code}</code>
    </pre>
  </div>
);

// ─────────────────────────────────────────────
// Sub-component: VulnerablePanel
// ─────────────────────────────────────────────
/**
 * LEFT panel — demonstrates the VULNERABLE implementation.
 *
 * Key behaviour:
 *   • Stores the user's raw input in `vulnInput` state.
 *   • On button click, copies it to `vulnResult` state.
 *   • Renders `vulnResult` via dangerouslySetInnerHTML,
 *     which means any <script> or event-handler payload the
 *     user types will be executed by the browser — exactly
 *     what a real XSS attack exploits.
 *
 * WARNING: This is intentionally insecure for educational purposes.
 */
const VulnerablePanel = () => {
  // Tracks what the user is currently typing
  const [vulnInput, setVulnInput] = useState("");

  // Tracks what has been "searched" (reflected back)
  const [vulnResult, setVulnResult] = useState(null);

  /**
   * Called when the "Search (Vulnerable)" button is clicked.
   * Copies the raw input into vulnResult — no sanitisation!
   */
  const handleVulnSearch = () => {
    if (!vulnInput.trim()) return;
    setVulnResult(vulnInput);
  };

  // ---- Vulnerable source code snippet (educational) ----
  const vulnerableCode = `// VULNERABLE — Never do this in production!
// dangerouslySetInnerHTML bypasses React's
// built-in XSS protections entirely.

function SearchResults({ query }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: "Results for: " + query
        // Raw user input injected into DOM!
      }}
    />
  );
}

// Try this payload in the input:
// <img src=x onerror="alert('XSS!')">
// <script>alert('hacked!')</script>`;

  // ---- Attack flow steps ----
  const attackSteps = [
    { label: "User Input" },
    { label: "Application" },
    { label: "Unsafe Rendering" },
    { label: "Browser Interprets HTML/JS" },
  ];

  return (
    <article className="rxss-panel rxss-panel--vuln">
      {/* ---- Panel header ---- */}
      <div className="rxss-panel__header rxss-panel__header--vuln">
        <FaUnlock className="rxss-panel__header-icon" />
        <div>
          <h2 className="rxss-panel__title">🔴 Vulnerable Application</h2>
          <p className="rxss-panel__tagline">
            Intentionally insecure — for demonstration only
          </p>
        </div>
        <span className="rxss-badge rxss-badge--danger">UNSAFE</span>
      </div>

      {/* ---- Input area ---- */}
      <div className="rxss-panel__body">
        <label htmlFor="vuln-input" className="rxss-label">
          Enter a search query{" "}
          <span className="rxss-label__hint">
            (try an XSS payload below)
          </span>
        </label>

        {/* Text input — no sanitisation applied */}
        <div className="rxss-input-row">
          <input
            id="vuln-input"
            type="text"
            className="rxss-input rxss-input--vuln"
            placeholder='e.g. hello or <img src=x onerror="alert(1)">'
            value={vulnInput}
            onChange={(e) => setVulnInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVulnSearch()}
          />
          <button
            id="vuln-search-btn"
            className="btn rxss-btn rxss-btn--vuln"
            onClick={handleVulnSearch}
          >
            <FaSearch /> Search
          </button>
        </div>

        {/* ---- Payload hint chips ---- */}
        <div className="rxss-hints">
          <span className="rxss-hints__label">Try payloads:</span>
          {[
            `<b>bold text</b>`,
            `<img src=x onerror="alert('XSS!')">`,
            `<script>alert('hacked!')</script>`,
          ].map((payload) => (
            <button
              key={payload}
              className="rxss-chip rxss-chip--vuln"
              onClick={() => setVulnInput(payload)}
              title="Click to paste this payload"
            >
              {payload}
            </button>
          ))}
        </div>

        {/* ---- Result area ---- */}
        {vulnResult !== null && (
          <div className="rxss-result rxss-result--vuln">
            <div className="rxss-result__label">
              <HiExclamationTriangle /> Vulnerable Result
            </div>

            {/* dangerouslySetInnerHTML — intentionally unsafe for demo */}
            <div
              className="rxss-result__output"
              dangerouslySetInnerHTML={{
                __html: `<span class="rxss-result__query-label">You searched for:</span> ${vulnResult}`,
              }}
            />

            {/* Warning banner */}
            <div className="rxss-result__warning">
              Raw HTML/JS was injected directly into the DOM. A real attacker
              could steal cookies, redirect users, or execute arbitrary code.
            </div>
          </div>
        )}

        {/* ---- Explanation section ---- */}
        <div className="rxss-explain">
          <h3 className="rxss-explain__title">
            <HiShieldExclamation /> Why Is This Vulnerable?
          </h3>
          <ul className="rxss-explain__list rxss-explain__list--vuln">
            <li>
              <strong>Raw reflection:</strong> The application copies user input
              directly into the HTML response with zero transformation.
            </li>
            <li>
              <strong>No encoding:</strong> Characters like{" "}
              <code>&lt;</code>, <code>&gt;</code>, and <code>"</code> are never
              escaped, so the browser treats them as HTML markup.
            </li>
            <li>
              <strong>Browser trusts the server:</strong> Whatever the server
              sends is executed — the browser cannot distinguish legitimate
              content from injected scripts.
            </li>
            <li>
              <strong>Attack vector:</strong> A crafted URL such as{" "}
              <code>/search?q=&lt;script&gt;stealCookies()&lt;/script&gt;</code>{" "}
              can be sent to victims; clicking it triggers the attack.
            </li>
          </ul>
        </div>

        {/* ---- Attack flow diagram ---- */}
        <AttackFlow steps={attackSteps} color="--accent-red" />

        {/* ---- Source code snippet ---- */}
        <CodeBlock
          title="vulnerable-search.jsx"
          code={vulnerableCode}
          accent="--accent-red"
        />
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecurePanel
// ─────────────────────────────────────────────
/**
 * RIGHT panel — demonstrates the SECURE implementation.
 *
 * Key behaviour:
 *   • Stores the user's raw input in `secureInput` state.
 *   • On button click, copies it to `secureResult` state.
 *   • Renders `secureResult` as a plain React text node (JSX
 *     curly-braces), which automatically HTML-encodes special
 *     characters — <script> becomes visible text, not code.
 *
 * This is the correct approach for handling untrusted input.
 */
const SecurePanel = () => {
  // Tracks what the user is currently typing
  const [secureInput, setSecureInput] = useState("");

  // Tracks what has been "searched" (safely rendered)
  const [secureResult, setSecureResult] = useState(null);

  /**
   * Called when the "Search (Secure)" button is clicked.
   * Copies raw input to secureResult — React will escape it.
   */
  const handleSecureSearch = () => {
    if (!secureInput.trim()) return;
    setSecureResult(secureInput);
  };

  // ---- Secure source code snippet (educational) ----
  const secureCode = `// SECURE — React's default safe behaviour
// React automatically HTML-encodes ALL values
// placed inside JSX curly braces {}.

function SearchResults({ query }) {
  // React escapes < > " ' & before rendering.
  // A <script> tag becomes the literal text
  // "<script>" — never executed as code.
  return (
    <div>
      Results for: {query}
      {/* Safe: React encodes special chars */}
    </div>
  );
}

// Additional server-side measures:
// • Content-Security-Policy header
// • Input validation & allowlisting
// • HttpOnly cookies (prevents JS theft)`;

  // ---- Processing flow steps (secure path) ----
  const secureSteps = [
    { label: "User Input" },
    { label: "Application" },
    { label: "Output Encoding" },
    { label: "Safe Text Rendered" },
  ];

  return (
    <article className="rxss-panel rxss-panel--secure">
      {/* ---- Panel header ---- */}
      <div className="rxss-panel__header rxss-panel__header--secure">
        <FaLock className="rxss-panel__header-icon" />
        <div>
          <h2 className="rxss-panel__title">🟢 Secure Application</h2>
          <p className="rxss-panel__tagline">
            Production-ready — safe input handling
          </p>
        </div>
        <span className="rxss-badge rxss-badge--safe">SAFE</span>
      </div>

      {/* ---- Input area ---- */}
      <div className="rxss-panel__body">
        <label htmlFor="secure-input" className="rxss-label">
          Enter a search query{" "}
          <span className="rxss-label__hint">
            (same payload — watch it get neutralised!)
          </span>
        </label>

        {/* Text input — React will handle encoding on render */}
        <div className="rxss-input-row">
          <input
            id="secure-input"
            type="text"
            className="rxss-input rxss-input--secure"
            placeholder='e.g. hello or <img src=x onerror="alert(1)">'
            value={secureInput}
            onChange={(e) => setSecureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSecureSearch()}
          />
          <button
            id="secure-search-btn"
            className="btn rxss-btn rxss-btn--secure"
            onClick={handleSecureSearch}
          >
            <FaSearch /> Search
          </button>
        </div>

        {/* ---- Same payload hint chips ---- */}
        <div className="rxss-hints">
          <span className="rxss-hints__label">Try payloads:</span>
          {[
            `<b>bold text</b>`,
            `<img src=x onerror="alert('XSS!')">`,
            `<script>alert('hacked!')</script>`,
          ].map((payload) => (
            <button
              key={payload}
              className="rxss-chip rxss-chip--secure"
              onClick={() => setSecureInput(payload)}
              title="Click to paste this payload"
            >
              {payload}
            </button>
          ))}
        </div>

        {/* ---- Result area ---- */}
        {secureResult !== null && (
          <div className="rxss-result rxss-result--secure">
            <div className="rxss-result__label">
              <HiShieldCheck /> Secure Result
            </div>

            {/*
             * React JSX curly braces automatically escape HTML entities.
             * The string is rendered as safe text — no dangerouslySetInnerHTML.
             */}
            <div className="rxss-result__output">
              <span className="rxss-result__query-label">
                You searched for:
              </span>{" "}
              {secureResult}
            </div>

            {/* Success banner */}
            <div className="rxss-result__success">
              Input was encoded before rendering — malicious tags appear as
              harmless plain text in the browser.
            </div>
          </div>
        )}

        {/* ---- Explanation section ---- */}
        <div className="rxss-explain">
          <h3 className="rxss-explain__title">
            <HiShieldCheck /> Why Is This Safe?
          </h3>
          <ul className="rxss-explain__list rxss-explain__list--secure">
            <li>
              <strong>Automatic encoding:</strong> React escapes{" "}
              <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and{" "}
              <code>"</code> in all JSX expressions by default.
            </li>
            <li>
              <strong>No raw HTML injection:</strong> User input is treated
              as a plain string — never parsed as markup by the browser.
            </li>
            <li>
              <strong>Attacker payload neutralised:</strong>{" "}
              <code>&lt;script&gt;alert()&lt;/script&gt;</code> is displayed
              as visible text, not executed as JavaScript.
            </li>
            <li>
              <strong>Defence in depth:</strong> Combine this with CSP headers,
              server-side validation, and HttpOnly cookies for layered
              protection.
            </li>
          </ul>
        </div>

        {/* ---- Security used checklist ---- */}
        <div className="rxss-security-used">
          <h4 className="rxss-security-used__title">Security Measures Used</h4>
          {[
            "Input handling — values stored in React state, not DOM",
            "Output encoding — React escapes HTML entities automatically",
            "Safe rendering — JSX text nodes, no dangerouslySetInnerHTML",
          ].map((measure) => (
            <div key={measure} className="rxss-security-used__item">
              <span className="rxss-security-used__check">✓</span>
              {measure}
            </div>
          ))}
        </div>

        {/* ---- Processing flow diagram ---- */}
        <AttackFlow steps={secureSteps} color="--accent-green" />

        {/* ---- Source code snippet ---- */}
        <CodeBlock
          title="secure-search.jsx"
          code={secureCode}
          accent="--accent-green"
        />
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────
// Main export: ReflectedXSS page
// ─────────────────────────────────────────────
/**
 * Top-level page component that assembles:
 *   1. PageHeader  — title + info banner
 *   2. VulnerablePanel (left)
 *   3. SecurePanel (right)
 *
 * The two panels sit inside a CSS Grid so they appear
 * side-by-side on desktop and stack vertically on mobile.
 */
const ReflectedXSS = () => {
  return (
    <div className="rxss-page">
      {/* Page-level header */}
      <PageHeader />

      {/* Side-by-side panel grid */}
      <div className="rxss-panels">
        <VulnerablePanel />
        <SecurePanel />
      </div>

      {/* Bottom educational note */}
      <footer className="rxss-footer-note">
        <HiInformationCircle />
        <p>
          <strong>Educational Notice:</strong> The vulnerable panel intentionally
          uses <code>dangerouslySetInnerHTML</code> to simulate an unsafe server
          response. Never use this pattern with untrusted user input in
          production applications.
        </p>
      </footer>
    </div>
  );
};

export default ReflectedXSS;
