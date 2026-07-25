/**
 * Home Page
 * ==========
 * The landing dashboard for the XSS Learning Lab.
 * Optimized for college portfolios, hackathons, and technical reviews.
 *
 * Includes:
 *   1. Hero Header
 *   2. Project Overview & Dynamic Learning Progress (using localStorage)
 *   3. Interactive Learning Path
 *   4. Feature Cards (Core Sandboxes)
 *   5. Quick Navigation (Reference Modules)
 *   6. Interactive FAQ (Collapsible items)
 *   7. Technology Stack Grid
 *   8. Call to Action (CTA)
 *
 * Location: src/pages/Home.jsx
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiShieldExclamation, HiQuestionMarkCircle, HiChevronDown } from "react-icons/hi";
import { HiCheckCircle, HiMiniSparkles, HiCpuChip, HiClipboardDocumentList } from "react-icons/hi2";
import { BiReflectHorizontal } from "react-icons/bi";
import { FaDatabase, FaCode, FaBalanceScale, FaShieldAlt, FaFlask, FaGraduationCap } from "react-icons/fa";

const Home = () => {
  // Collapsible state for FAQ items
  const [activeFaq, setActiveFaq] = useState(null);

  // Learning Progress state (tracks completion of core modules)
  const [progress, setProgress] = useState({
    reflected: false,
    stored: false,
    dom: false,
    quiz: false,
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("xss_lab_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Error reading progress", e);
      }
    }
  }, []);

  // Update a progress item and save to localStorage
  const toggleProgress = (key) => {
    const updated = { ...progress, [key]: !progress[key] };
    setProgress(updated);
    localStorage.setItem("xss_lab_progress", JSON.stringify(updated));
  };

  // Calculate overall percentage
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / Object.keys(progress).length) * 100);

  // Core demo cards
  const coreDemos = [
    {
      id: "reflected",
      title: "Reflected XSS Sandbox",
      description:
        "Understand how user inputs are immediately reflected back from the server response without validation, enabling script execution via malicious URLs.",
      tags: ["URL parameters", "server reflection", "untrusted inputs"],
      icon: <BiReflectHorizontal />,
      path: "/reflected-xss",
      modifier: "card--reflected",
    },
    {
      id: "stored",
      title: "Stored XSS Sandbox",
      description:
        "Explore how malicious scripts are permanently stored inside a database and served to every user requesting the affected page resources.",
      tags: ["persistent", "database store", "raw comments"],
      icon: <FaDatabase />,
      path: "/stored-xss",
      modifier: "card--stored",
    },
    {
      id: "dom",
      title: "DOM Based XSS Sandbox",
      description:
        "Learn how client-side JavaScript extracts data from sources (like window.location) and outputs to unsafe sinks (like innerHTML) entirely in the browser.",
      tags: ["pure client-side", "execution sinks", "untrusted sources"],
      icon: <FaCode />,
      path: "/dom-xss",
      modifier: "card--dom",
    },
  ];

  // Quick Nav links
  const quickNavItems = [
    { label: "Comparison Matrix", desc: "Compare Reflected, Stored, & DOM XSS side-by-side.", path: "/comparison", icon: <FaBalanceScale />, color: "var(--accent-purple)" },
    { label: "Secure Coding Guide", desc: "Output encoding, Content Security Policies, & Safe APIs.", path: "/prevention", icon: <FaShieldAlt />, color: "var(--accent-green)" },
    { label: "Local Payload Bank", desc: "A sandbox-safe collection of beginner to advanced payloads.", path: "/payload-lab", icon: <FaFlask />, color: "var(--accent-orange)" },
    { label: "Cybersecurity Quiz", desc: "15 targeted multiple-choice challenges to test your knowledge.", path: "/quiz", icon: <FaGraduationCap />, color: "var(--accent-blue)" },
  ];

  // FAQ items
  const faqItems = [
    {
      q: "What is Cross-Site Scripting (XSS)?",
      a: "Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users. This allows attackers to bypass same-origin policies, steal session cookies, capture keyboard inputs, or redirect users to malicious domains.",
    },
    {
      q: "Is it safe to run these payloads inside this laboratory?",
      a: "Yes, this lab is designed to run in a sandboxed offline/local environment on your local server. The payload exercises are strictly simulated for educational exploration. However, do not paste actual credentials or session keys into the simulations.",
    },
    {
      q: "Why are some comments rendered differently in Stored XSS?",
      a: "In the Stored XSS sandbox, the vulnerable comments component stores and renders input without escaping HTML tags, causing scripts to run. The secure comments component encodes output entities or filters markup, displaying code safely as plain text.",
    },
    {
      q: "How does React prevent XSS by default?",
      a: "React automatically escapes dynamic variables placed inside standard JSX curly braces {}. It translates character strings (like < and >) into secure HTML entities (like &lt; and &gt;), preventing the browser from parsing strings as active elements.",
    },
  ];

  // Timeline / Learning Path
  const learningSteps = [
    { step: "01", title: "Analyze The Matrix", desc: "Study the differences between the XSS types on the Comparison page.", path: "/comparison" },
    { step: "02", title: "Test Vulnerabilities", desc: "Input payloads from the Payload Lab into the local interactive sandboxes.", path: "/reflected-xss" },
    { step: "03", title: "Learn Securing Code", desc: "Review secure patterns like output encoding and CSPs on the Prevention page.", path: "/prevention" },
    { step: "04", title: "Validate Knowledge", desc: "Complete the 15-question interactive quiz to challenge your understanding.", path: "/quiz" },
  ];

  return (
    <div className="home-container animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* ====== Hero Section ====== */}
      <section className="hero" aria-label="Welcome Banner">
        <div className="hero__badge">
          <HiShieldExclamation />
          Interactive Cyber Security Sandbox
        </div>
        <h1 className="hero__title">
          Master <span className="hero__title-highlight">Cross-Site Scripting</span>
        </h1>
        <p className="hero__subtitle">
          An interactive laboratory showing vulnerable vs. secure web implementations side-by-side.
          Empower yourself to detect, exploit, and prevent front-end script injections.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", zIndex: 5, position: "relative" }}>
          <Link to="/reflected-xss" className="btn btn--primary" aria-label="Start interactive demos">
            Start Lab Demos <HiArrowRight />
          </Link>
          <Link to="/quiz" className="btn btn--outline" aria-label="Take the security quiz">
            Take Quiz Challenge
          </Link>
        </div>
      </section>

      {/* ====== Project Overview & Progress Grid ====== */}
      <section className="container" style={{ marginBottom: "3rem" }} aria-label="Dashboard Overview">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "1.5rem", alignItems: "stretch" }} className="about-grid">
          {/* Overview */}
          <article className="about-card about-card--accent-blue" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2 className="about-card__title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <HiCpuChip style={{ color: "var(--accent-cyan)" }} />
                Platform Overview
              </h2>
              <p className="about-card__text" style={{ fontSize: "0.95rem" }}>
                Welcome to the **XSS Learning Lab**! This project acts as a live educational reference demonstrating how web applications expose data to code execution (vulnerable paths) vs. how engineering teams implement security controls (secure paths).
              </p>
              <p className="about-card__text" style={{ fontSize: "0.95rem" }}>
                Use the navigation menu to explore sandboxed inputs, study the differences in browser behaviors, review secure snippets, and test your understanding through interactive diagnostics.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }} className="about-credits-grid">
              <div>
                <strong style={{ color: "var(--accent-cyan)" }}>Security Focused</strong>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Side-by-side defensive guides.</p>
              </div>
              <div>
                <strong style={{ color: "var(--accent-purple)" }}>100% Client Safe</strong>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Runs locally inside your browser.</p>
              </div>
            </div>
          </article>

          {/* Dynamic Progress Card */}
          <article className="about-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2 className="about-card__title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <HiClipboardDocumentList style={{ color: "var(--accent-purple)" }} />
                Your Lab Progress
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", margin: "1rem 0" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: "800", color: "var(--accent-cyan)", lineHeight: 1 }}>{progressPercent}%</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>completed</span>
              </div>
              
              {/* Progress bar */}
              <div style={{ height: "6px", background: "rgba(148, 163, 184, 0.12)", borderRadius: "999px", overflow: "hidden", marginBottom: "1.5rem" }}>
                <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--gradient-btn)", transition: "width 0.4s ease" }} />
              </div>

              {/* Checkboxes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input type="checkbox" checked={progress.reflected} onChange={() => toggleProgress("reflected")} style={{ accentColor: "var(--accent-cyan)" }} />
                  Reflected XSS Demo
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input type="checkbox" checked={progress.stored} onChange={() => toggleProgress("stored")} style={{ accentColor: "var(--accent-cyan)" }} />
                  Stored XSS Demo
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input type="checkbox" checked={progress.dom} onChange={() => toggleProgress("dom")} style={{ accentColor: "var(--accent-cyan)" }} />
                  DOM Based XSS Demo
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input type="checkbox" checked={progress.quiz} onChange={() => toggleProgress("quiz")} style={{ accentColor: "var(--accent-cyan)" }} />
                  Cybersecurity Quiz Checked
                </label>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ====== Feature Section (Core Sandboxes) ====== */}
      <section className="container" style={{ marginBottom: "3rem" }} aria-label="Vulnerability Sandboxes">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "1.5rem", textAlign: "center" }}>
          Core Vulnerability Sandboxes
        </h2>
        <div className="cards-grid" style={{ padding: 0 }}>
          {coreDemos.map((demo) => (
            <article key={demo.id} className={`card ${demo.modifier}`} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="card__icon-wrapper">{demo.icon}</div>
                <h3 className="card__title">{demo.title}</h3>
                <p className="card__description" style={{ fontSize: "0.86rem", minHeight: "80px" }}>{demo.description}</p>
                <div className="card__tags">
                  {demo.tags.map((t) => (
                    <span key={t} className="card__tag">{t}</span>
                  ))}
                </div>
              </div>
              <Link to={demo.path} className="btn btn--primary" style={{ marginTop: "1rem", alignSelf: "flex-start", width: "100%", justifyContent: "center" }}>
                Enter Sandbox <HiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ====== Learning Path Section ====== */}
      <section className="container" style={{ marginBottom: "3.5rem" }} aria-label="Learning Path Steps">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "0.5rem", textAlign: "center" }}>
          Suggested Learning Path
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textAlign: "center", marginBottom: "2rem" }}>
          Follow these structured modules to fully comprehend front-end injection security.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
          {learningSteps.map((step, idx) => (
            <div key={idx} style={{ background: "rgba(26, 31, 53, 0.4)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "1.5rem", position: "relative" }}>
              <span style={{ fontSize: "2rem", fontWeight: "800", color: "rgba(34, 211, 238, 0.15)", fontFamily: "var(--font-mono)", position: "absolute", top: "1rem", right: "1rem" }}>
                {step.step}
              </span>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-heading)", marginBottom: "0.5rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1rem" }}>{step.desc}</p>
              <Link to={step.path} style={{ fontSize: "0.82rem", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: "600" }}>
                Go to module <HiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Quick Navigation / Reference Cards ====== */}
      <section className="container" style={{ marginBottom: "3.5rem" }} aria-label="Reference Modules">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "1.5rem", textAlign: "center" }}>
          Reference Guides & Diagnostics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {quickNavItems.map((item, idx) => (
            <Link key={idx} to={item.path} style={{ display: "flex", gap: "1rem", background: "var(--bg-card)", border: "1px solid var(--border-default)", padding: "1.25rem", borderRadius: "var(--radius-md)", transition: "all var(--transition-fast)" }} className="pay-card">
              <div style={{ fontSize: "1.5rem", color: item.color, display: "flex", alignItems: "center" }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-heading)", marginBottom: "0.25rem" }}>{item.label}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Collapsible FAQ Section ====== */}
      <section className="container" style={{ marginBottom: "3.5rem" }} aria-label="Frequently Asked Questions">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "1.5rem", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqItems.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  style={{ width: "100%", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", color: "var(--text-heading)", fontWeight: "600", fontSize: "0.92rem", textAlign: "left", cursor: "pointer" }}
                  aria-expanded={isOpen}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <HiQuestionMarkCircle style={{ color: "var(--accent-cyan)", fontSize: "1.1rem" }} />
                    {faq.q}
                  </span>
                  <HiChevronDown style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform var(--transition-fast)" }} />
                </button>
                <div style={{ maxHeight: isOpen ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <p style={{ padding: "0 1.25rem 1.1rem", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: "1.65", borderTop: "1px solid var(--border-default)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====== Technology Stack ====== */}
      <section className="container" style={{ marginBottom: "3.5rem" }} aria-label="Technology Stack Used">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text-heading)", marginBottom: "1.5rem", textAlign: "center" }}>
          Built With Modern MERN & Security Practices
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", background: "rgba(97, 218, 251, 0.08)", border: "1px solid rgba(97, 218, 251, 0.2)", color: "#61dafb", fontSize: "0.82rem", fontWeight: "600" }}>
            React & JSX
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", background: "rgba(104, 160, 99, 0.08)", border: "1px solid rgba(104, 160, 99, 0.2)", color: "#68a063", fontSize: "0.82rem", fontWeight: "600" }}>
            Node & Express
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", background: "rgba(52, 211, 153, 0.08)", border: "1px solid rgba(52, 211, 153, 0.2)", color: "var(--accent-green)", fontSize: "0.82rem", fontWeight: "600" }}>
            MongoDB Store
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", background: "rgba(167, 139, 250, 0.08)", border: "1px solid rgba(167, 139, 250, 0.2)", color: "var(--accent-purple)", fontSize: "0.82rem", fontWeight: "600" }}>
            DOMPurify Sanitisation
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", background: "rgba(251, 146, 60, 0.08)", border: "1px solid rgba(251, 146, 60, 0.2)", color: "var(--accent-orange)", fontSize: "0.82rem", fontWeight: "600" }}>
            Helmet Security Headers
          </span>
        </div>
      </section>

      {/* ====== Call to Action (CTA) ====== */}
      <section className="container" aria-label="Diagnostic Call to Action">
        <div style={{ background: "linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(167, 139, 250, 0.08))", border: "1px solid var(--border-glow-cyan)", padding: "2.5rem 2rem", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "0.5rem" }}>
            Ready to Test Your Security Intuition?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 1.5rem", lineHeight: "1.6" }}>
            Challenge yourself with 15 conceptual and engineering questions on Cross-Site Scripting, secure inputs, cookies, and HTTP security policies.
          </p>
          <Link to="/quiz" className="btn btn--primary">
            Start Quiz Challenge <HiMiniSparkles />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
