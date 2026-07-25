/**
 * About.jsx — About the XSS Learning Lab Project
 * =================================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Explains the goal, tech stack, architecture, and objectives of the project.
 *
 * Location: src/pages/About.jsx
 */

import { HiInformationCircle } from "react-icons/hi";
import { FaBookmark, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      {/* Header */}
      <header className="about-header">
        <div className="about-header__inner">
          <div className="about-header__icon">
            <FaBookmark />
          </div>
          <div>
            <h1 className="about-header__title">About XSS Lab</h1>
            <p className="about-header__subtitle">
              Overview of the project mission, design architecture, and educational targets
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="about-grid">
        {/* Row 1 Left: Goal and Mission */}
        <div className="about-card about-card--accent-blue">
          <h2 className="about-card__title">Project Mission & Goal</h2>
          <p className="about-card__text">
            The <strong>XSS Learning Lab</strong> is an interactive, double-sided cybersecurity training
            platform built to demonstrate Cross-Site Scripting (XSS) mechanisms and defenses.
            Our primary goal is to empower software engineers and security learners to understand how XSS vulnerabilities
            propagate through dynamic applications, and how to safely write code to neutralize them.
          </p>
          <p className="about-card__text">
            By presenting vulnerable and secure implementations side-by-side, learners can immediately compare code behaviors,
            test raw script payloads in real-time, and study secure coding guidelines in the same context.
          </p>
        </div>

        {/* Row 1 Right: Learning Objectives */}
        <div className="about-card">
          <h2 className="about-card__title">Learning Objectives</h2>
          <ul className="prev-list prev-list--check">
            <li>Differentiate between <strong>Reflected</strong>, <strong>Stored</strong>, and <strong>DOM-based</strong> XSS.</li>
            <li>Understand the role of execution sinks (e.g. innerHTML) and untrusted client sources.</li>
            <li>Implement context-aware HTML entity output encoding in web applications.</li>
            <li>Configure HTTP security directives like Content Security Policy (CSP) and HttpOnly session cookies.</li>
            <li>Analyze backend sanitisation models and database interaction flows.</li>
          </ul>
        </div>

        {/* Row 2 Left: Technology Stack */}
        <div className="about-card">
          <h2 className="about-card__title">Technology Stack</h2>
          <div className="about-tech-list">
            <div className="about-tech-item">
              <FaReact className="about-tech-item__icon about-tech-item__icon--react" />
              <div>
                <strong>Frontend: React & Vite</strong>
                <p>Component-driven dynamic single-page architecture styled with vanilla CSS custom properties.</p>
              </div>
            </div>
            <div className="about-tech-item">
              <FaNodeJs className="about-tech-item__icon about-tech-item__icon--node" />
              <div>
                <strong>Backend: Node.js & Express</strong>
                <p>High-performance web API containing routing layers, custom CORS settings, and security controllers.</p>
              </div>
            </div>
            <div className="about-tech-item">
              <FaDatabase className="about-tech-item__icon about-tech-item__icon--db" />
              <div>
                <strong>Database: MongoDB & Mongoose</strong>
                <p>Document-store database persisting comments raw (vulnerable) and escaped (secure) to demonstrate storage vectors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 Right: Architecture & Features */}
        <div className="about-card">
          <h2 className="about-card__title">Architecture & Key Features</h2>
          <p className="about-card__text">
            The platform is built around a decoupled **MERN client-server architecture**:
          </p>
          <ul className="prev-list">
            <li><strong>Side-by-Side Compare:</strong> Run tests inside independent Vulnerable and Secure sandboxes simultaneously.</li>
            <li><strong>Dynamic API Host Routing:</strong> Axios instances dynamically resolve baseURLs using the page's host, resolving localhost vs 127.0.0.1 discrepancies.</li>
            <li><strong>Interactive Code Terminals:</strong> Visualise syntax-highlighted backend code changes.</li>
            <li><strong>Interactive Quiz engine:</strong> Question checklist providing explanations on correctness.</li>
          </ul>
        </div>

        {/* Bottom Row: License, Credits & Future Expansion */}
        <div className="about-card about-card--full-width">
          <h2 className="about-card__title">Credits, License & Future Extensions</h2>
          <div className="about-credits-grid">
            <div>
              <strong>Credits & Team</strong>
              <p>Designed and built as a modular cybersecurity training resource by the JOVAC developer team, pair-programmed with the Antigravity AI coding assistant.</p>
            </div>
            <div>
              <strong>Project License</strong>
              <p>Licensed under the ISC License. Free to copy, modify, and distribute for academic or educational security courses.</p>
            </div>
            <div>
              <strong>Future Improvements</strong>
              <p>Upcoming phases plan to implement CSRF token simulations, session hijacking simulators, advanced CSP sandbox modifiers, and lab metrics dashboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Callout */}
      <footer className="about-footer-info">
        <HiInformationCircle />
        <span>Version 1.2.0 • Phase 6 Complete learning platform build</span>
      </footer>
    </div>
  );
};

export default About;
