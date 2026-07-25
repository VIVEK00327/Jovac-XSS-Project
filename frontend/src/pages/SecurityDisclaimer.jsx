/**
 * SecurityDisclaimer Page
 * =======================
 * Contains the cybersecurity project safety guidelines, legal disclaimers,
 * educational limits, safe testing protocols, and responsible disclosure info.
 * This is vital for any cybersecurity-related public repository or portfolio.
 *
 * Location: src/pages/SecurityDisclaimer.jsx
 */

import { HiShieldExclamation, HiAcademicCap, HiWrenchScrewdriver, HiBookOpen, HiLockClosed } from "react-icons/hi2";
import PageHeader from "../components/PageHeader";

const SecurityDisclaimer = () => {
  return (
    <div className="about-page animate-fade-in" style={{ maxWidth: "1000px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
      {/* Reusable PageHeader */}
      <PageHeader
        icon={<HiShieldExclamation />}
        title="Safety & Disclaimer"
        subtitle="Important legal notices, safe testing guidelines, and limitations of this learning environment."
      />

      <section className="about-grid" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Educational Policy Card */}
        <article className="about-card about-card--accent-blue" style={{ borderLeft: "4px solid var(--accent-cyan)" }}>
          <h2 className="about-card__title" style={{ display: "flex", alignParagraph: "center", gap: "0.5rem" }}>
            <HiAcademicCap style={{ color: "var(--accent-cyan)", fontSize: "1.4rem" }} />
            1. Educational Purpose & Scope
          </h2>
          <p className="about-card__text">
            <strong>XSS Learning Lab</strong> is an open-source cybersecurity education portal designed and developed
            exclusively to demonstrate the mechanics of cross-site scripting (XSS) in a safe, offline, and controlled local sandbox.
          </p>
          <p className="about-card__text">
            The vulnerabilities simulated here serve to guide developers in secure coding practices. The source code is
            simplified to clearly isolate input vectors and encoding sinks without the complexity of enterprise frameworks.
          </p>
        </article>

        {/* Legal Disclaimer Card */}
        <article className="about-card" style={{ borderLeft: "4px solid var(--accent-red)" }}>
          <h2 className="about-card__title" style={{ display: "flex", alignParagraph: "center", gap: "0.5rem", color: "var(--accent-red)" }}>
            <HiLockClosed style={{ color: "var(--accent-red)", fontSize: "1.4rem" }} />
            2. Legal Disclaimer
          </h2>
          <p className="about-card__text">
            Under no circumstances should the scripts, payloads, or attack patterns explained in this project be launched
            against public systems or any application without prior explicit written authorization from the system owners.
          </p>
          <p className="about-card__text" style={{ fontStyle: "italic", borderLeft: "2px solid var(--text-muted)", paddingLeft: "1rem", color: "var(--text-secondary)" }}>
            "Unauthorized system probing, scanning, or script execution may violate state and federal cybersecurity laws
            (e.g., Computer Fraud and Abuse Act in the US, Computer Misuse Act in the UK, and respective cyber laws globally).
            The creators and contributors of this project assume zero liability for any misuse of the information provided herein."
          </p>
        </article>

        {/* Safe Testing Guidelines Card */}
        <article className="about-card" style={{ borderLeft: "4px solid var(--accent-green)" }}>
          <h2 className="about-card__title" style={{ display: "flex", alignParagraph: "center", gap: "0.5rem", color: "var(--accent-green)" }}>
            <HiWrenchScrewdriver style={{ color: "var(--accent-green)", fontSize: "1.4rem" }} />
            3. Safe Testing Guidelines
          </h2>
          <p className="about-card__text">
            When experimenting with the vulnerability demonstrations or payload database:
          </p>
          <ul className="prev-list prev-list--check" style={{ marginTop: "0.5rem" }}>
            <li>Run the application locally on localhost (127.0.0.1) inside your sandboxed development server.</li>
            <li>Ensure the backend server uses mock data (MongoDB local instance or in-memory emulation) instead of production systems.</li>
            <li>Do not expose the application backend to public networks without configuring strict firewall policies.</li>
            <li>Do not paste active session tokens, real passwords, or personally identifiable information (PII) into the vulnerability simulator.</li>
          </ul>
        </article>

        {/* Responsible Disclosure Card */}
        <article className="about-card" style={{ borderLeft: "4px solid var(--accent-purple)" }}>
          <h2 className="about-card__title" style={{ display: "flex", alignParagraph: "center", gap: "0.5rem", color: "var(--accent-purple)" }}>
            <HiBookOpen style={{ color: "var(--accent-purple)", fontSize: "1.4rem" }} />
            4. Responsible Disclosure Policy
          </h2>
          <p className="about-card__text">
            If you identify a security vulnerability in a real-world system, web service, or library:
          </p>
          <ul className="prev-list" style={{ marginTop: "0.5rem" }}>
            <li style={{ listStyle: "circle" }}>
              <strong>Private Reporting:</strong> Contact the affected vendor privately through their official security contact or vulnerability disclosure program.
            </li>
            <li style={{ listStyle: "circle" }}>
              <strong>Provide Details:</strong> Share precise reproduction steps, payload examples, and impact analysis without exposing public advisories.
            </li>
            <li style={{ listStyle: "circle" }}>
              <strong>Allow Remediation:</strong> Give the vendor reasonable time to patch the vulnerability before releasing public technical reports.
            </li>
          </ul>
        </article>

        {/* Project Limitations Card */}
        <article className="about-card" style={{ borderLeft: "4px solid var(--accent-orange)" }}>
          <h2 className="about-card__title" style={{ display: "flex", alignParagraph: "center", gap: "0.5rem", color: "var(--accent-orange)" }}>
            <HiShieldExclamation style={{ color: "var(--accent-orange)", fontSize: "1.4rem" }} />
            5. Sandbox Limitations & Defense In Depth
          </h2>
          <p className="about-card__text">
            Please note that the secure modes in this application showcase target mitigations (like standard HTML entity encoding or DOM Purify).
            In production enterprise environments, security should always rely on defense-in-depth:
          </p>
          <ul className="prev-list prev-list--check" style={{ marginTop: "0.5rem" }}>
            <li>Framework-native bindings (React's automatic state binding renders plain text instead of script execution).</li>
            <li>Strict content security policy (CSP) headers to block injection payload execution even if rendering boundaries fail.</li>
            <li>WAF (Web Application Firewalls) to monitor and filter anomalous request payloads.</li>
          </ul>
        </article>

      </section>
    </div>
  );
};

export default SecurityDisclaimer;
