/**
 * StoredXSS.jsx — Stored XSS Learning Module
 * ============================================
 * Phase 4 implementation of the XSS Learning Lab.
 * Restructured side-by-side layout with horizontal dividers.
 *
 * Location: src/pages/StoredXSS.jsx
 */

import { useState, useEffect, useCallback } from "react";
import {
  HiShieldExclamation,
  HiShieldCheck,
  HiArrowDown,
  HiCode,
  HiInformationCircle,
  HiTrash,
  HiRefresh,
  HiChevronDown,
} from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { FaDatabase, FaLock, FaUnlock, FaUser, FaCommentAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import api from "../services/api";

// ─────────────────────────────────────────────
// Sub-component: PageHeader
// ─────────────────────────────────────────────
const PageHeader = () => (
  <header className="sxss-header">
    <div className="sxss-header__top">
      <div className="sxss-header__icon-wrap">
        <FaDatabase />
      </div>
      <div>
        <h1 className="sxss-header__title">Stored XSS</h1>
        <p className="sxss-header__subtitle">
          Interactive side-by-side comparison — comments persisted to MongoDB
        </p>
      </div>
    </div>

    <div className="sxss-info-banner">
      <HiInformationCircle className="sxss-info-banner__icon" />
      <div>
        <strong>What is Stored XSS?</strong>
        <p>
          Stored (Persistent) XSS occurs when an application saves
          user-supplied data to a database without sanitisation, then
          serves that raw data to every visitor who views the page.
          Unlike Reflected XSS, the attacker doesn't need to trick each
          victim individually — the malicious script is permanently stored
          and executed automatically for every reader.
        </p>
      </div>
    </div>
  </header>
);

// ─────────────────────────────────────────────
// Sub-component: AttackFlow
// ─────────────────────────────────────────────
const AttackFlow = ({ steps, color }) => (
  <div className="sxss-flow">
    <h4 className="sxss-flow__title">
      {color === "--accent-red" ? "Attack Flow" : "Protection Flow"}
    </h4>
    <div className="sxss-flow__steps">
      {steps.map((step, idx) => (
        <div key={idx} className="sxss-flow__item">
          <div
            className="sxss-flow__step"
            style={{ borderColor: `var(${color})`, color: `var(${color})` }}
          >
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <HiArrowDown
              className="sxss-flow__arrow"
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
  <div className="sxss-code">
    <div className="sxss-code__bar">
      <span className="sxss-code__dot" style={{ background: `var(${accent})` }} />
      <span className="sxss-code__file-name">{title}</span>
      <HiCode className="sxss-code__icon" />
    </div>
    <pre className="sxss-code__pre">
      <code>{code}</code>
    </pre>
  </div>
);

// ─────────────────────────────────────────────
// Sub-component: CommentCard
// ─────────────────────────────────────────────
const CommentCard = ({ comment, isVuln, index }) => {
  const date = new Date(comment.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`sxss-comment ${isVuln ? "sxss-comment--vuln" : "sxss-comment--secure"}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="sxss-comment__header">
        <div className={`sxss-comment__avatar ${isVuln ? "sxss-comment__avatar--vuln" : "sxss-comment__avatar--secure"}`}>
          {comment.username.charAt(0).toUpperCase()}
        </div>
        <div className="sxss-comment__meta">
          {isVuln ? (
            <span
              className="sxss-comment__author"
              dangerouslySetInnerHTML={{ __html: comment.username }}
            />
          ) : (
            <span className="sxss-comment__author">{comment.username}</span>
          )}
          <span className="sxss-comment__time">{date}</span>
        </div>
      </div>

      <div className="sxss-comment__body">
        {isVuln ? (
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        ) : (
          <div>{comment.content}</div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: AccordionItem
// ─────────────────────────────────────────────
const AccordionItem = ({ title, icon: Icon, isOpen, onToggle, children, accentColor }) => {
  return (
    <div className={`sxss-accordion-item ${isOpen ? "sxss-accordion-item--open" : ""}`} style={{ '--accordion-accent': `var(${accentColor})` }}>
      <button
        type="button"
        className="sxss-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="sxss-accordion-header__title">
          {Icon && <Icon className="sxss-accordion-header__icon" style={{ color: `var(${accentColor})` }} />}
          {title}
        </span>
        <HiChevronDown className="sxss-accordion-header__chevron" />
      </button>
      <div className="sxss-accordion-content">
        <div className="sxss-accordion-content__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: VulnerableForm
// ─────────────────────────────────────────────
const VulnerableForm = ({ onCommentAdded }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await api.post("/xss/stored/vulnerable", {
        username: name,
        content: comment,
      });
      setName("");
      setComment("");
      onCommentAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sxss-form-container sxss-form-container--vuln">
      <form className="sxss-form" onSubmit={handleSubmit} noValidate>
        <div className="sxss-form__group">
          <label htmlFor="vuln-name" className="sxss-label">
            <FaUser className="sxss-label__icon" /> Name Input
          </label>
          <input
            id="vuln-name"
            type="text"
            className="sxss-input sxss-input--vuln"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="sxss-form__group">
          <label htmlFor="vuln-comment" className="sxss-label">
            <FaCommentAlt className="sxss-label__icon" /> Comment Input
            <span className="sxss-label__hint"> (try an XSS payload)</span>
          </label>
          <textarea
            id="vuln-comment"
            className="sxss-textarea sxss-textarea--vuln"
            placeholder='e.g. Great post! or <img src=x onerror="alert(document.cookie)">'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={500}
          />
        </div>

        {/* Payload hint chips */}
        <div className="sxss-hints">
          <span className="sxss-hints__label">Try payloads:</span>
          {[
            `<b>bold text</b>`,
            `<img src=x onerror="alert('XSS!')">`,
            `<script>alert(document.cookie)</script>`,
          ].map((p) => (
            <button
              key={p}
              type="button"
              className="sxss-chip sxss-chip--vuln"
              onClick={() => setComment(p)}
              title="Paste this payload"
            >
              {p}
            </button>
          ))}
        </div>

        {error && <p className="sxss-error">{error}</p>}

        <div className="sxss-form__actions">
          <button
            id="vuln-submit-btn"
            type="submit"
            className="sxss-btn sxss-btn--vuln"
            disabled={submitting || !name.trim() || !comment.trim()}
          >
            {submitting ? <span className="sxss-spinner" /> : <MdSend />}
            {submitting ? "Submitting…" : "Submit Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecureForm
// ─────────────────────────────────────────────
const SecureForm = ({ onCommentAdded }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await api.post("/xss/stored/secure", {
        username: name,
        content: comment,
      });
      setName("");
      setComment("");
      onCommentAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sxss-form-container sxss-form-container--secure">
      <form className="sxss-form" onSubmit={handleSubmit} noValidate>
        <div className="sxss-form__group">
          <label htmlFor="secure-name" className="sxss-label">
            <FaUser className="sxss-label__icon" /> Name Input
          </label>
          <input
            id="secure-name"
            type="text"
            className="sxss-input sxss-input--secure"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="sxss-form__group">
          <label htmlFor="secure-comment" className="sxss-label">
            <FaCommentAlt className="sxss-label__icon" /> Comment Input
            <span className="sxss-label__hint"> (same payload — watch it get neutralised)</span>
          </label>
          <textarea
            id="secure-comment"
            className="sxss-textarea sxss-textarea--secure"
            placeholder='e.g. Great post! or <img src=x onerror="alert(1)">'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={500}
          />
        </div>

        {/* Payload hint chips */}
        <div className="sxss-hints">
          <span className="sxss-hints__label">Try payloads:</span>
          {[
            `<b>bold text</b>`,
            `<img src=x onerror="alert('XSS!')">`,
            `<script>alert(document.cookie)</script>`,
          ].map((p) => (
            <button
              key={p}
              type="button"
              className="sxss-chip sxss-chip--secure"
              onClick={() => setComment(p)}
              title="Paste this payload"
            >
              {p}
            </button>
          ))}
        </div>

        {error && <p className="sxss-error">{error}</p>}

        <div className="sxss-form__actions">
          <button
            id="secure-submit-btn"
            type="submit"
            className="sxss-btn sxss-btn--secure"
            disabled={submitting || !name.trim() || !comment.trim()}
          >
            {submitting ? <span className="sxss-spinner" /> : <MdSend />}
            {submitting ? "Submitting…" : "Submit Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: VulnerableFeed
// ─────────────────────────────────────────────
const VulnerableFeed = ({ comments, onClear, loading }) => {
  return (
    <div className="sxss-feed-container sxss-feed-container--vuln">
      <div className="sxss-feed__header">
        <h3 className="sxss-feed__title">
          <HiExclamationTriangle /> Stored Comments
          <span className="sxss-feed__count">{comments.length}</span>
        </h3>
        {comments.length > 0 && (
          <button
            className="sxss-clear-btn sxss-clear-btn--vuln"
            onClick={() => onClear("vulnerable")}
            title="Clear all vulnerable comments"
          >
            <HiTrash /> Clear
          </button>
        )}
      </div>

      {loading && (
        <div className="sxss-loading">
          <span className="sxss-spinner sxss-spinner--red" />
          <span>Loading comments…</span>
        </div>
      )}

      {!loading && comments.length === 0 && (
        <div className="sxss-empty">
          <FaCommentAlt className="sxss-empty__icon" />
          <p>No comments yet. Submit one above to see it rendered below.</p>
        </div>
      )}

      {!loading && comments.map((c, i) => (
        <CommentCard key={c._id} comment={c} isVuln={true} index={i} />
      ))}

      {!loading && comments.length > 0 && (
        <div className="sxss-feed__warning">
          ⚠️ Comments rendered with dangerouslySetInnerHTML — any stored
          XSS payload executes for EVERY visitor who loads this page.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Sub-component: SecureFeed
// ─────────────────────────────────────────────
const SecureFeed = ({ comments, onClear, loading }) => {
  return (
    <div className="sxss-feed-container sxss-feed-container--secure">
      <div className="sxss-feed__header">
        <h3 className="sxss-feed__title">
          <HiShieldCheck /> Secure Comments
          <span className="sxss-feed__count sxss-feed__count--secure">{comments.length}</span>
        </h3>
        {comments.length > 0 && (
          <button
            className="sxss-clear-btn sxss-clear-btn--secure"
            onClick={() => onClear("secure")}
            title="Clear all secure comments"
          >
            <HiTrash /> Clear
          </button>
        )}
      </div>

      {loading && (
        <div className="sxss-loading">
          <span className="sxss-spinner sxss-spinner--green" />
          <span>Loading comments…</span>
        </div>
      )}

      {!loading && comments.length === 0 && (
        <div className="sxss-empty">
          <FaCommentAlt className="sxss-empty__icon" />
          <p>No comments yet. Submit one above to see it rendered safely below.</p>
        </div>
      )}

      {!loading && comments.map((c, i) => (
        <CommentCard key={c._id} comment={c} isVuln={false} index={i} />
      ))}

      {!loading && comments.length > 0 && (
        <div className="sxss-feed__success">
          ✅ Stored content is HTML-encoded — XSS payloads display as
          harmless text for every visitor.
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

  const vulnerableCode = `// VULNERABLE BACKEND (xssController.js)
// No sanitisation — raw values written to DB

export const postVulnerableComment = async (req, res) => {
  const { username, content } = req.body;

  // ⚠️ Raw user input stored directly!
  const comment = await Comment.create({
    username: username,  // may contain XSS
    content: content,    // may contain XSS
    type: "vulnerable",
  });
  res.status(201).json({ comment });
};

// VULNERABLE FRONTEND (StoredXSS.jsx)
// dangerouslySetInnerHTML renders stored payload

<div dangerouslySetInnerHTML={{ __html: comment.content }} />
// ⚠️ Any stored <script> or onerror fires here!`;

  const attackSteps = [
    { label: "Attacker Submits Payload" },
    { label: "Server Stores Raw Content (MongoDB)" },
    { label: "Victim Loads the Page" },
    { label: "Server Returns Raw Payload" },
    { label: "Browser Executes Script" },
  ];

  return (
    <div className="sxss-edu-container sxss-edu-container--vuln">
      <AccordionItem
        title="Explanation"
        icon={HiInformationCircle}
        isOpen={openSection === "explain"}
        onToggle={() => handleToggle("explain")}
        accentColor="--accent-red"
      >
        <div className="sxss-explain">
          <ul className="sxss-explain__list sxss-explain__list--vuln">
            <li>
              <strong>Persistent payload:</strong> The XSS script is written to
              MongoDB — it persists across page reloads and server restarts.
            </li>
            <li>
              <strong>Mass impact:</strong> Every visitor who views the comment
              section runs the attacker's code — the attacker doesn't need to
              target victims individually.
            </li>
            <li>
              <strong>No server sanitisation:</strong> The backend stores raw
              input; <code>&lt;script&gt;</code> tags are never encoded.
            </li>
            <li>
              <strong>Unsafe frontend rendering:</strong>{" "}
              <code>dangerouslySetInnerHTML</code> instructs React to bypass its
              built-in XSS protections and insert raw HTML into the DOM.
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
          title="vulnerable-stored.js / StoredXSS.jsx"
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
        <div className="sxss-explain">
          <ul className="sxss-explain__list sxss-explain__list--vuln">
            <li>
              <strong>Input Validation & Sanitisation:</strong> Validate input types and restrict lengths. Use standard libraries (e.g., <code>DOMPurify</code> or <code>sanitize-html</code>) to clean HTML if markup is required.
            </li>
            <li>
              <strong>Output Encoding (HTML Entity Escaping):</strong> Convert special characters like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, <code>&quot;</code>, and <code>&#x27;</code> into their equivalent HTML entities before storing or rendering.
            </li>
            <li>
              <strong>Safe Client Rendering:</strong> Avoid <code>dangerouslySetInnerHTML</code> in React. Bind dynamic content inside standard JSX tags (e.g. <code>&lt;div&gt;&#123;comment.content&#125;&lt;/div&gt;</code>), which React escapes by default.
            </li>
            <li>
              <strong>Strict Content Security Policy (CSP):</strong> Implement CSP headers (like <code>script-src &#x27;self&#x27;</code>) to block execution of inline or unauthorised scripts.
            </li>
            <li>
              <strong>HttpOnly Session Cookies:</strong> Use the <code>HttpOnly</code> cookie flag to prevent malicious JavaScript from accessing and stealing session tokens.
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

  const secureCode = `// SECURE BACKEND (xssController.js)
// HTML entity escaping before writing to DB

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")   // & → &amp;
    .replace(/</g, "&lt;")    // < → &lt;
    .replace(/>/g, "&gt;")    // > → &gt;
    .replace(/"/g, "&quot;")  // " → &quot;
    .replace(/'/g, "&#x27;"); // ' → &#x27;

export const postSecureComment = async (req, res) => {
  const { username, content } = req.body;

  // ✅ Sanitise before storage
  const comment = await Comment.create({
    username: escapeHtml(username.trim()),
    content:  escapeHtml(content.trim()),
    type: "secure",
  });
  res.status(201).json({ comment });
};

// SECURE FRONTEND (StoredXSS.jsx)
// Plain React text node — no dangerouslySetInnerHTML

<div>{comment.content}</div>
// ✅ React encodes any remaining entities — payload is text`;

  const protectionSteps = [
    { label: "User Submits Input" },
    { label: "Server: escapeHtml() Encodes Payload" },
    { label: "Safe Content Written to MongoDB" },
    { label: "Server Returns Encoded Content" },
    { label: "Browser Shows Plain Text — No Execution" },
  ];

  return (
    <div className="sxss-edu-container sxss-edu-container--secure">
      <AccordionItem
        title="Explanation"
        icon={HiInformationCircle}
        isOpen={openSection === "explain"}
        onToggle={() => handleToggle("explain")}
        accentColor="--accent-green"
      >
        <div className="sxss-explain">
          <ul className="sxss-explain__list sxss-explain__list--secure">
            <li>
              <strong>Server-side escaping:</strong> The backend converts{" "}
              <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>,{" "}
              <code>"</code>, and <code>'</code> into safe HTML entities before
              writing to MongoDB.
            </li>
            <li>
              <strong>Safe at source:</strong> Even if a future developer
              mistakenly uses <code>dangerouslySetInnerHTML</code>, the stored
              data is already encoded — still safe.
            </li>
            <li>
              <strong>React text nodes:</strong> The frontend renders content as
              a JSX text expression, adding a second layer of encoding.
            </li>
            <li>
              <strong>Defence in depth:</strong> Server-side encoding + safe
              frontend rendering + CSP headers = layered protection.
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Protection Flow"
        icon={HiArrowDown}
        isOpen={openSection === "flow"}
        onToggle={() => handleToggle("flow")}
        accentColor="--accent-green"
      >
        <AttackFlow steps={protectionSteps} color="--accent-green" />
      </AccordionItem>

      <AccordionItem
        title="Source Code"
        icon={HiCode}
        isOpen={openSection === "code"}
        onToggle={() => handleToggle("code")}
        accentColor="--accent-green"
      >
        <CodeBlock
          title="secure-stored.js / StoredXSS.jsx"
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
        <div className="sxss-security-used">
          <h4 className="sxss-security-used__title">Security Measures Used</h4>
          {[
            "Input handling — values trimmed and length-limited",
            "Output encoding — HTML entity escaping (server-side, pre-storage)",
            "Safe rendering — React JSX text node, no dangerouslySetInnerHTML",
            "Database — encoded content stored, never raw payload",
          ].map((m) => (
            <div key={m} className="sxss-security-used__item">
              <span className="sxss-security-used__check">✓</span>
              {m}
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main export: StoredXSS page
// ─────────────────────────────────────────────
const StoredXSS = () => {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [fetchError, setFetchError]   = useState("");

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await api.get("/xss/stored/comments");
      setAllComments(res.data.comments || []);
    } catch (err) {
      setFetchError(
        err.response?.data?.message || "Failed to load comments. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleClear = async (type) => {
    try {
      await api.delete(`/xss/stored/comments?type=${type}`);
      fetchComments();
    } catch (err) {
      console.error("Clear failed:", err.message);
    }
  };

  const vulnComments   = allComments.filter((c) => c.type === "vulnerable");
  const secureComments = allComments.filter((c) => c.type === "secure");

  return (
    <div className="sxss-page">
      {/* Page header */}
      <PageHeader />

      {/* Global fetch error */}
      {fetchError && (
        <div className="sxss-fetch-error">
          <HiExclamationTriangle /> {fetchError}
        </div>
      )}

      {/* Refresh button */}
      <div className="sxss-toolbar">
        <button className="sxss-refresh-btn" onClick={fetchComments} disabled={loading}>
          <HiRefresh className={loading ? "sxss-refresh-btn__icon--spinning" : ""} />
          {loading ? "Refreshing…" : "Refresh Comments"}
        </button>
        <span className="sxss-toolbar__note">
          Comments persist in MongoDB across page reloads — that's what makes
          Stored XSS so dangerous.
        </span>
      </div>

      {/* Header and badge section */}
      <div className="sxss-section sxss-section--headers">
        <div className="sxss-panel-header sxss-panel-header--vuln">
          <FaUnlock className="sxss-panel-header-icon" />
          <div>
            <h2 className="sxss-panel-title">🔴 Vulnerable Application</h2>
            <p className="sxss-panel-tagline">No sanitisation — raw input stored</p>
          </div>
          <span className="sxss-badge sxss-badge--danger">UNSAFE</span>
        </div>
        <div className="sxss-panel-header sxss-panel-header--secure">
          <FaLock className="sxss-panel-header-icon" />
          <div>
            <h2 className="sxss-panel-title">🟢 Secure Application</h2>
            <p className="sxss-panel-tagline">HTML escaping applied server-side</p>
          </div>
          <span className="sxss-badge sxss-badge--safe">SAFE</span>
        </div>
      </div>

      {/* Row 1: Side-by-side forms */}
      <div className="sxss-section sxss-section--forms">
        <VulnerableForm onCommentAdded={fetchComments} />
        <SecureForm onCommentAdded={fetchComments} />
      </div>

      <div className="sxss-divider" />

      {/* Row 2: Side-by-side comment lists */}
      <div className="sxss-section sxss-section--feeds">
        <VulnerableFeed comments={vulnComments} onClear={handleClear} loading={loading} />
        <SecureFeed comments={secureComments} onClear={handleClear} loading={loading} />
      </div>

      <div className="sxss-divider" />

      {/* Row 3: Side-by-side educational details (Accordions) */}
      <div className="sxss-section sxss-section--edu">
        <VulnerableEdu />
        <SecureEdu />
      </div>

      {/* Bottom educational note */}
      <footer className="sxss-footer-note">
        <HiInformationCircle />
        <p>
          <strong>Educational Notice:</strong> The vulnerable panel intentionally
          skips sanitisation and uses <code>dangerouslySetInnerHTML</code> to
          demonstrate Stored XSS. Comments persist in MongoDB — use the{" "}
          <strong>Clear</strong> buttons to reset the demo.
          Never use unsanitised database content in real applications.
        </p>
      </footer>
    </div>
  );
};

export default StoredXSS;
