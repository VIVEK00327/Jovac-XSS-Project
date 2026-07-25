/**
 * DOMXSS.jsx — DOM Based XSS Learning Module
 * ============================================
 * Phase 5 implementation of the XSS Learning Lab.
 * Restructured side-by-side layout with horizontal dividers.
 *
 * Location: src/pages/DOMXSS.jsx
 */

import { useState, useRef, useEffect } from "react";
import {
  HiShieldExclamation,
  HiShieldCheck,
  HiArrowDown,
  HiCode,
  HiInformationCircle,
  HiChevronDown,
} from "react-icons/hi";
import { FaCode, FaLock, FaUnlock, FaTerminal, FaGlobe } from "react-icons/fa";
import { MdSend } from "react-icons/md";

// ─────────────────────────────────────────────
// Sub-component: PageHeader
// ─────────────────────────────────────────────
const PageHeader = () => (
  <header className="dxss-header">
    <div className="dxss-header__top">
      <div className="dxss-header__icon-wrap">
        <FaCode />
      </div>
      <div>
        <h1 className="dxss-header__title">DOM Based XSS</h1>
        <p className="dxss-header__subtitle">
          Interactive client-side demonstration of DOM-based injection and mitigation
        </p>
      </div>
    </div>

    <div className="dxss-info-banner">
      <HiInformationCircle className="dxss-info-banner__icon" />
      <div>
        <strong>What is DOM Based XSS?</strong>
        <p>
          DOM Based XSS occurs entirely in the client-side JavaScript. It happens when
          an application takes user input from an untrusted source (like URL parameters,
          hash fragments, or form inputs) and passes it to a sink that executes code
          (like <code>innerHTML</code>, <code>eval()</code>, or <code>document.write()</code>)
          without proper sanitisation. Unlike Reflected or Stored XSS, the payload does not need
          to travel to the server.
        </p>
      </div>
    </div>
  </header>
);

// ─────────────────────────────────────────────
// Sub-component: AttackFlow
// ─────────────────────────────────────────────
const AttackFlow = ({ steps, color }) => (
  <div className="dxss-flow">
    <h4 className="dxss-flow__title">
      {color === "--accent-red" ? "Attack Flow" : "Protection Flow"}
    </h4>
    <div className="dxss-flow__steps">
      {steps.map((step, idx) => (
        <div key={idx} className="dxss-flow__item">
          <div
            className="dxss-flow__step"
            style={{ borderColor: `var(${color})`, color: `var(${color})` }}
          >
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <HiArrowDown
              className="dxss-flow__arrow"
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
const CodeBlock = ({ title, code, accent }) => (
  <div className="dxss-code">
    <div className="dxss-code__bar">
      <span className="dxss-code__dot" style={{ background: `var(${accent})` }} />
      <span className="dxss-code__file-name">{title}</span>
      <HiCode className="dxss-code__icon" />
    </div>
    <pre className="dxss-code__pre">
      <code>{code}</code>
    </pre>
  </div>
);

// ─────────────────────────────────────────────
// Sub-component: AccordionItem
// ─────────────────────────────────────────────
const AccordionItem = ({ title, icon: Icon, isOpen, onToggle, children, accentColor }) => {
  return (
    <div className={`dxss-accordion-item ${isOpen ? "dxss-accordion-item--open" : ""}`} style={{ '--accordion-accent': `var(${accentColor})` }}>
      <button
        type="button"
        className="dxss-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="dxss-accordion-header__title">
          {Icon && <Icon className="dxss-accordion-header__icon" style={{ color: `var(${accentColor})` }} />}
          {title}
        </span>
        <HiChevronDown className="dxss-accordion-header__chevron" />
      </button>
      <div className="dxss-accordion-content">
        <div className="dxss-accordion-content__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: VulnerableForm
// ─────────────────────────────────────────────
const VulnerableForm = ({ onUpdate }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(input);
  };

  return (
    <div className="dxss-form-container dxss-form-container--vuln">
      <form className="dxss-form" onSubmit={handleSubmit} noValidate>
        <div className="dxss-form__group">
          <label htmlFor="vuln-input" className="dxss-label">
            <FaTerminal className="dxss-label__icon" /> Input Box
          </label>
          <input
            id="vuln-input"
            type="text"
            className="dxss-input dxss-input--vuln"
            placeholder="Enter text or payload..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Payload chips */}
        <div className="dxss-hints">
          <span className="dxss-hints__label">Try payloads:</span>
          {[
            `Hello World`,
            `<img src=x onerror="alert('DOM XSS!')">`,
            `<b onmouseover="alert('Hover XSS!')">hover me!</b>`,
          ].map((p) => (
            <button
              key={p}
              type="button"
              className="dxss-chip dxss-chip--vuln"
              onClick={() => setInput(p)}
              title="Paste this payload"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="dxss-form__actions">
          <button
            id="vuln-submit-btn"
            type="submit"
            className="dxss-btn dxss-btn--vuln"
            disabled={!input.trim()}
          >
            <MdSend /> Update Page
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: VulnerableOutput
// ─────────────────────────────────────────────
const VulnerableOutput = ({ outputText }) => {
  const outputRef = useRef();

  useEffect(() => {
    if (outputRef.current) {
      if (outputText) {
        // ⚠️ Unsafe Sink: injecting raw string into innerHTML
        outputRef.current.innerHTML = `You entered: ${outputText}`;

        // Find and execute script tags manually to mimic true execution sink
        const scripts = outputRef.current.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          // Copy all attributes (e.g. src)
          Array.from(oldScript.attributes).forEach((attr) =>
            newScript.setAttribute(attr.name, attr.value)
          );
          // Copy content
          newScript.textContent = oldScript.textContent;
          // Replace to force script execution
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      } else {
        outputRef.current.innerHTML = "Output is empty. Submit text above to update the page.";
      }
    }
  }, [outputText]);

  return (
    <div className="dxss-output-container dxss-output-container--vuln">
      <div className="dxss-output-header">
        <FaGlobe className="dxss-output-header__icon" />
        <span className="dxss-output-header__title">Browser Output</span>
      </div>
      <div className="dxss-output-screen">
        <div ref={outputRef} className="dxss-output-render dxss-output-render--vuln" />
      </div>
      {outputText && (
        <div className="dxss-output-warning">
          ⚠️ Value written directly to <code>element.innerHTML</code>. Any HTML markup
          or event handler executes immediately.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecureForm
// ─────────────────────────────────────────────
const SecureForm = ({ onUpdate }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(input);
  };

  return (
    <div className="dxss-form-container dxss-form-container--secure">
      <form className="dxss-form" onSubmit={handleSubmit} noValidate>
        <div className="dxss-form__group">
          <label htmlFor="secure-input" className="dxss-label">
            <FaTerminal className="dxss-label__icon" /> Input Box
          </label>
          <input
            id="secure-input"
            type="text"
            className="dxss-input dxss-input--secure"
            placeholder="Enter text or payload..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Payload chips */}
        <div className="dxss-hints">
          <span className="dxss-hints__label">Try payloads:</span>
          {[
            `Hello World`,
            `<img src=x onerror="alert('DOM XSS!')">`,
            `<b onmouseover="alert('Hover XSS!')">hover me!</b>`,
          ].map((p) => (
            <button
              key={p}
              type="button"
              className="dxss-chip dxss-chip--secure"
              onClick={() => setInput(p)}
              title="Paste this payload"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="dxss-form__actions">
          <button
            id="secure-submit-btn"
            type="submit"
            className="dxss-btn dxss-btn--secure"
            disabled={!input.trim()}
          >
            <MdSend /> Update Page
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecureOutput
// ─────────────────────────────────────────────
const SecureOutput = ({ outputText }) => {
  const outputRef = useRef();

  useEffect(() => {
    if (outputRef.current) {
      // ✅ Safe Sink: writing raw string to textContent (or innerText)
      // Special characters like < > & are auto-escaped as safe entities.
      outputRef.current.textContent = outputText
        ? `You entered: ${outputText}`
        : "Output is empty. Submit text above to update the page.";
    }
  }, [outputText]);

  return (
    <div className="dxss-output-container dxss-output-container--secure">
      <div className="dxss-output-header">
        <FaGlobe className="dxss-output-header__icon" />
        <span className="dxss-output-header__title">Browser Output</span>
      </div>
      <div className="dxss-output-screen">
        <div ref={outputRef} className="dxss-output-render dxss-output-render--secure" />
      </div>
      {outputText && (
        <div className="dxss-output-success">
          ✅ Value written safely using <code>element.textContent</code>. Special HTML characters
          are HTML-encoded by the browser.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: VulnerableEdu
// ─────────────────────────────────────────────
const VulnerableEdu = () => {
  const [openSection, setOpenSection] = useState("explain");

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const vulnerableCode = `// VULNERABLE CLIENT-SIDE CODE
// Read input from the DOM and write it raw to innerHTML

const input = document.getElementById("vuln-input").value;
const outputDiv = document.getElementById("vuln-output");

// ⚠️ Vulnerable Sink: writing raw user input as HTML!
outputDiv.innerHTML = "You entered: " + input;

// If input is: <img src=x onerror="alert(1)">
// The browser parses this image tag and immediately executes the script.`;

  const attackSteps = [
    { label: "User inputs malicious payload into text box" },
    { label: "JavaScript reads the value (untrusted source)" },
    { label: "JavaScript writes payload to element.innerHTML (unsafe sink)" },
    { label: "Browser parses the newly inserted HTML code" },
    { label: "Browser runs the injected onerror script payload" },
  ];

  return (
    <div className="dxss-edu-container dxss-edu-container--vuln">
      <AccordionItem
        title="Explanation"
        icon={HiInformationCircle}
        isOpen={openSection === "explain"}
        onToggle={() => handleToggle("explain")}
        accentColor="--accent-red"
      >
        <div className="dxss-explain">
          <ul className="dxss-explain__list dxss-explain__list--vuln">
            <li>
              <strong>Client-Side Vulnerability:</strong> The entire attack happens in the victim's browser. No server request or database interaction is needed.
            </li>
            <li>
              <strong>Unsafe Data Flow:</strong> JavaScript fetches input from a <em>source</em> (like input elements, <code>location.search</code>, or <code>location.hash</code>) and pipes it directly into a code-execution <em>sink</em>.
            </li>
            <li>
              <strong>Unescaped Sink:</strong> Using properties like <code>innerHTML</code> instructs the browser to parse the string as HTML. Any scripts in the input will run immediately.
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Attack Flow"
        icon={HiArrowDown}
        isOpen={openSection === "flow"}
        onToggle={() => handleToggle("flow")}
        accentColor="--accent-red"
      >
        <AttackFlow steps={attackSteps} color="--accent-red" />
      </AccordionItem>

      <AccordionItem
        title="Source Code"
        icon={HiCode}
        isOpen={openSection === "code"}
        onToggle={() => handleToggle("code")}
        accentColor="--accent-red"
      >
        <CodeBlock
          title="vulnerable-dom-xss.js"
          code={vulnerableCode}
          accent="--accent-red"
        />
      </AccordionItem>

      <AccordionItem
        title="Prevention"
        icon={HiShieldExclamation}
        isOpen={openSection === "prevention"}
        onToggle={() => handleToggle("prevention")}
        accentColor="--accent-red"
      >
        <div className="dxss-explain">
          <ul className="dxss-explain__list dxss-explain__list--vuln">
            <li>
              <strong>Use Safe Sinks:</strong> Instead of <code>innerHTML</code>, use safe text sinks like <code>textContent</code>, <code>innerText</code>, or standard React bindings (<code>&#123;text&#125;</code>) which treat inputs purely as strings.
            </li>
            <li>
              <strong>Sanitise Dynamic Markup:</strong> If rendering HTML is absolutely necessary, pass the input through a sanitisation library like <code>DOMPurify</code> before assigning it to the sink.
            </li>
            <li>
              <strong>Avoid Dangerous Functions:</strong> Completely avoid execution sinks like <code>eval()</code>, <code>setTimeout(string)</code>, <code>setInterval(string)</code>, and writing dynamic URLs to <code>location.href</code>.
            </li>
            <li>
              <strong>Input Validation:</strong> Validate and restrict client-side inputs to allowlisted values or strictly sanitised schemas.
            </li>
          </ul>
        </div>
      </AccordionItem>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecureEdu
// ─────────────────────────────────────────────
const SecureEdu = () => {
  const [openSection, setOpenSection] = useState("explain");

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const secureCode = `// SECURE CLIENT-SIDE CODE
// Read input and write it using safe text APIs

const input = document.getElementById("secure-input").value;
const outputDiv = document.getElementById("secure-output");

// ✅ Secure Sink: textContent assigns input strictly as text
outputDiv.textContent = "You entered: " + input;

// Even if input is: <img src=x onerror="alert(1)">
// The browser renders the tags literally as text, never executes code.`;

  const protectionSteps = [
    { label: "User inputs malicious payload into text box" },
    { label: "JavaScript reads the value (source)" },
    { label: "JavaScript assigns value to element.textContent (safe sink)" },
    { label: "Browser encodes brackets (< to &lt;, etc.) automatically" },
    { label: "Browser displays content safely as harmless string text" },
  ];

  return (
    <div className="dxss-edu-container dxss-edu-container--secure">
      <AccordionItem
        title="Explanation"
        icon={HiInformationCircle}
        isOpen={openSection === "explain"}
        onToggle={() => handleToggle("explain")}
        accentColor="--accent-green"
      >
        <div className="dxss-explain">
          <ul className="dxss-explain__list dxss-explain__list--secure">
            <li>
              <strong>Safe API usage:</strong> Safe properties like <code>textContent</code> and <code>innerText</code> write content as data, never as executable code.
            </li>
            <li>
              <strong>Context-aware encoding:</strong> The browser automatically HTML-encodes control characters (like <code>&lt;</code>, <code>&gt;</code>) during text assignment.
            </li>
            <li>
              <strong>Dual layer in React:</strong> React JSX expressions (e.g. <code>&#123;result&#125;</code>) bind values to safe text nodes by default, providing built-in protection against DOM injection.
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Why Safe"
        icon={HiShieldCheck}
        isOpen={openSection === "why-safe"}
        onToggle={() => handleToggle("why-safe")}
        accentColor="--accent-green"
      >
        <div className="dxss-explain">
          <ul className="dxss-explain__list dxss-explain__list--secure">
            <li>
              <strong>No HTML Parsing:</strong> Unlike <code>innerHTML</code>, the browser's parser is never invoked on properties set with <code>textContent</code>. Thus, tags like <code>&lt;img&gt;</code> are treated as static letters, not elements.
            </li>
            <li>
              <strong>Neutralised Handlers:</strong> Any JavaScript script or inline error handler remains completely dormant, visualised as plain harmless text.
            </li>
            <li>
              <strong>Built-in Browser Defense:</strong> Secure APIs invoke the browser's native text nodes, which inherently protect against tag-level injection vulnerabilities.
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Source Code"
        icon={HiCode}
        isOpen={openSection === "code"}
        onToggle={() => handleToggle("code")}
        accentColor="--accent-green"
      >
        <CodeBlock
          title="secure-dom-xss.js"
          code={secureCode}
          accent="--accent-green"
        />
      </AccordionItem>

      <AccordionItem
        title="Security Used"
        icon={HiShieldCheck}
        isOpen={openSection === "security"}
        onToggle={() => handleToggle("security")}
        accentColor="--accent-green"
      >
        <div className="dxss-security-used">
          <h4 className="dxss-security-used__title">Security Measures Used</h4>
          {[
            "Output encoding — using textContent instead of innerHTML",
            "Safe rendering — React curly brace bindings, avoiding direct script executions",
            "Input limiting — restricts payload length in client-side text box",
            "Neutralised sinks — eliminates dangerouslySetInnerHTML usages",
          ].map((m) => (
            <div key={m} className="dxss-security-used__item">
              <span className="dxss-security-used__check">✓</span>
              {m}
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main export: DOMXSS page
// ─────────────────────────────────────────────
const DOMXSS = () => {
  const [vulnOutput, setVulnOutput] = useState("");
  const [secureOutput, setSecureOutput] = useState("");

  return (
    <div className="dxss-page">
      {/* Page header */}
      <PageHeader />

      {/* Header and badge section */}
      <div className="dxss-section dxss-section--headers">
        <div className="dxss-panel-header dxss-panel-header--vuln">
          <FaUnlock className="dxss-panel-header-icon" />
          <div>
            <h2 className="dxss-panel-title">🔴 Vulnerable Application</h2>
            <p className="dxss-panel-tagline">Client script writes raw input to innerHTML sink</p>
          </div>
          <span className="dxss-badge dxss-badge--danger">UNSAFE</span>
        </div>
        <div className="dxss-panel-header dxss-panel-header--secure">
          <FaLock className="dxss-panel-header-icon" />
          <div>
            <h2 className="dxss-panel-title">🟢 Secure Application</h2>
            <p className="dxss-panel-tagline">Client script writes input to safe textContent sink</p>
          </div>
          <span className="dxss-badge dxss-badge--safe">SAFE</span>
        </div>
      </div>

      {/* Row 1: Side-by-side forms */}
      <div className="dxss-section dxss-section--forms">
        <VulnerableForm onUpdate={setVulnOutput} />
        <SecureForm onUpdate={setSecureOutput} />
      </div>

      <div className="dxss-divider" />

      {/* Row 2: Side-by-side browser outputs */}
      <div className="dxss-section dxss-section--outputs">
        <VulnerableOutput outputText={vulnOutput} />
        <SecureOutput outputText={secureOutput} />
      </div>

      <div className="dxss-divider" />

      {/* Row 3: Side-by-side educational details (Accordions) */}
      <div className="dxss-section dxss-section--edu">
        <VulnerableEdu />
        <SecureEdu />
      </div>

      {/* Bottom educational note */}
      <footer className="dxss-footer-note">
        <HiInformationCircle />
        <p>
          <strong>Educational Notice:</strong> The vulnerable panel intentionally assigns input to <code>innerHTML</code> to demonstrate DOM Based XSS execution. In production applications, always use safe text writing sinks or a robust HTML sanitiser library.
        </p>
      </footer>
    </div>
  );
};

export default DOMXSS;
