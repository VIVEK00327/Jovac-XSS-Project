/**
 * Comparison.jsx — XSS Types Comparison Page
 * ============================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Presents a comprehensive comparison table and detailed explanations
 * of Reflected, Stored, and DOM Based XSS.
 *
 * Location: src/pages/Comparison.jsx
 */

import { HiArrowRight, HiInformationCircle } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";

const Comparison = () => {
  const comparisonData = [
    {
      feature: "Where it happens",
      reflected: "Client-side (rendered from response)",
      stored: "Client-side (rendered from database)",
      dom: "Client-side JavaScript (entirely in browser DOM)",
    },
    {
      feature: "Server involvement",
      reflected: "Yes (receives payload, reflects it immediately)",
      stored: "Yes (receives payload, saves to database, serves it)",
      dom: "No (payload processed inside browser JavaScript)",
    },
    {
      feature: "Database involvement",
      reflected: "No",
      stored: "Yes (payload is saved persistently)",
      dom: "No",
    },
    {
      feature: "Persistence",
      reflected: "Non-persistent (lasts for one request)",
      stored: "Persistent (saved permanently until deleted)",
      dom: "Non-persistent (stored in DOM state/URL hash)",
    },
    {
      feature: "Exploit Difficulty",
      reflected: "Easy (needs social engineering / link click)",
      stored: "Very Easy (affects anyone opening the page)",
      dom: "Medium (needs client-side flow manipulation)",
    },
    {
      feature: "Typical Impact",
      reflected: "Session theft, redirects, targeted account takeover",
      stored: "Widespread account takeover, worm spread, mass theft",
      dom: "Session theft, client redirection, client info exposure",
    },
    {
      feature: "Common Mistakes",
      reflected: "Insecure reflection of query parameters without escaping",
      stored: "Writing raw rich text/comments to database directly",
      dom: "Using innerHTML, eval(), or document.write() with user inputs",
    },
    {
      feature: "Primary Prevention",
      reflected: "Context-aware output encoding (escape HTML entities)",
      stored: "Input sanitisation + output encoding before render",
      dom: "Use textContent / safe binding. Avoid innerHTML.",
    },
    {
      feature: "Real-world Example",
      reflected: "Insecure search box echoing query parameters",
      stored: "Blog comment section, message board posts, profile names",
      dom: "Reading location.hash to parse user-selected theme page",
    },
    {
      feature: "OWASP Recommendation",
      reflected: "A03:2021-Injection - strict output encoding",
      stored: "A03:2021-Injection - sanitise first, escape always",
      dom: "A03:2021-Injection - use secure execution APIs",
    },
    {
      feature: "Browser Behaviour",
      reflected: "Browser executes code inside HTTP response stream",
      stored: "Browser executes code loaded inside database content response",
      dom: "Browser script runs inside existing DOM without reloading",
    },
  ];

  return (
    <div className="comp-page animate-fade-in">
      {/* Page Header */}
      <header className="comp-header">
        <div className="comp-header__inner">
          <div className="comp-header__icon">
            <FaBalanceScale />
          </div>
          <div>
            <h1 className="comp-header__title">Comparing XSS Types</h1>
            <p className="comp-header__subtitle">
              Detailed breakdown of Reflected, Stored, and DOM-based Cross-Site Scripting
            </p>
          </div>
        </div>
      </header>

      {/* Main Table Section */}
      <section className="comp-card">
        <h2 className="comp-card__title">XSS Matrix</h2>
        <div className="comp-table-wrap">
          <table className="comp-table">
            <thead>
              <tr>
                <th>Feature / Metric</th>
                <th className="comp-table__header--vuln">🔴 Reflected XSS</th>
                <th className="comp-table__header--stored">🔴 Stored XSS</th>
                <th className="comp-table__header--dom">🔴 DOM Based XSS</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td className="comp-table__feature">{row.feature}</td>
                  <td>{row.reflected}</td>
                  <td>{row.stored}</td>
                  <td>{row.dom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Explanations Section */}
      <section className="comp-explain-grid">
        <article className="comp-explain-card">
          <h3 className="comp-explain-card__title">
            <span className="dot dot--red"></span> Reflected XSS Overview
          </h3>
          <p className="comp-explain-card__text">
            Reflected XSS occurs when a web application reflects user input immediately in its response
            without validation or escaping. The attacker crafts a malicious URL containing the script
            and convinces the victim to click it. When the victim’s browser requests that URL, the
            payload is reflected straight back in the HTML response and runs instantly under the victim's session.
          </p>
          <div className="comp-explain-card__tag">
            <HiArrowRight /> Requires user to click a link.
          </div>
        </article>

        <article className="comp-explain-card">
          <h3 className="comp-explain-card__title">
            <span className="dot dot--red"></span> Stored XSS Overview
          </h3>
          <p className="comp-explain-card__text">
            Stored (Persistent) XSS is the most dangerous form. The attacker submits a malicious script payload
            to the application (such as in a comments section or username field) which gets written permanently
            to the database. When other visitors request the page, the server loads this raw payload from the database
            and injects it into the page served to them. Everyone who views the comment runs the script automatically.
          </p>
          <div className="comp-explain-card__tag">
            <HiArrowRight /> Runs automatically for all page visitors.
          </div>
        </article>

        <article className="comp-explain-card">
          <h3 className="comp-explain-card__title">
            <span className="dot dot--red"></span> DOM Based XSS Overview
          </h3>
          <p className="comp-explain-card__text">
            DOM-based XSS is unique because it lives entirely inside client-side scripts. The server is not
            necessarily involved, and the network payload might never leave the browser (e.g. if passed via URL fragments like
            <code>#payload</code>). The script is parsed and executed because the site's own JavaScript reads from an
            untrusted source and writes directly to an unsafe sink like <code>element.innerHTML</code>.
          </p>
          <div className="comp-explain-card__tag">
            <HiArrowRight /> Vulnerability lies purely in browser JavaScript code.
          </div>
        </article>
      </section>

      {/* Educational Notice */}
      <footer className="comp-info-footer">
        <HiInformationCircle className="comp-info-footer__icon" />
        <div>
          <strong>Defence-in-Depth Recommendation</strong>
          <p>
            Securing applications against Cross-Site Scripting requires a layered defense model.
            While output encoding prevents Reflected XSS and Stored XSS, you must also use safe sinks
            inside client-side scripts to avoid DOM-based vulnerabilities, combined with a strict
            Content Security Policy (CSP) header.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Comparison;
