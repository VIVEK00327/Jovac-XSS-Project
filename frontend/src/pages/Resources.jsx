/**
 * Resources.jsx — Cybersecurity & XSS Resources Page
 * ======================================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Compiles a list of cybersecurity resources, cheatsheets, and practices.
 *
 * Location: src/pages/Resources.jsx
 */

import { HiExternalLink } from "react-icons/hi";
import { FaBookReader } from "react-icons/fa";

const Resources = () => {
  const resourceCategories = [
    {
      title: "OWASP Guides & Standards",
      items: [
        {
          name: "OWASP Cross-Site Scripting (XSS) Prevention Cheat Sheet",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
          desc: "The gold standard for developer references on mitigating XSS. Includes context-aware encoding rules, escaping details, and allowlist practices."
        },
        {
          name: "OWASP DOM Based XSS Prevention Cheat Sheet",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_Based_Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
          desc: "Detailed guide focusing specifically on client-side sinks, sources, and policies to neutralize DOM-based script injections."
        },
        {
          name: "OWASP Top 10:2021 Injection Category",
          url: "https://owasp.org/Top10/A03_2021-Injection/",
          desc: "OWASP’s directory explaining injection vulnerabilities (A03:2021), including description, walkthroughs, risks, and mitigation strategies."
        }
      ]
    },
    {
      title: "MDN & Browser Security Docs",
      items: [
        {
          name: "MDN Web Docs: Cross-Site Scripting (XSS)",
          url: "https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting",
          desc: "Comprehensive developer glossary definition detailing XSS classifications, attack vectors, and browser-side impacts."
        },
        {
          name: "MDN Web Docs: Content Security Policy (CSP)",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
          desc: "Complete developer manual on how to design, configure, and implement Content Security Policy headers in web servers."
        },
        {
          name: "MDN Web Docs: Trusted Types API",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API",
          desc: "Technical documentation covering the Trusted Types API structure to enforce type safety on sink assignments."
        }
      ]
    },
    {
      title: "Books & Courses",
      items: [
        {
          name: "Book: Web Application Hacker's Handbook",
          url: "https://www.wiley.com/en-us/The+Web+Application+Hacker's+Handbook:+Finding+and+Exploiting+Security+Flaws,+2nd+Edition-p-9781118026472",
          desc: "The definitive textbook on web application security, detailing injection flows, browser behaviors, and defensive architectures."
        },
        {
          name: "Book: Real-World Bug Hunting by Peter Yaworski",
          url: "https://nostarch.com/bug-hunting",
          desc: "A highly practical book that explains common web vulnerabilities, including real-world case studies of stored and reflected XSS."
        },
        {
          name: "Course: Stanford Web Security Course (CS253)",
          url: "https://web.stanford.edu/class/cs253/",
          desc: "Stanford’s public university course covering client-side security policies, frames, and cookies."
        }
      ]
    },
    {
      title: "Practice Platforms & Labs",
      items: [
        {
          name: "PortSwigger Web Security Academy",
          url: "https://portswigger.net/web-security",
          desc: "Free, high-quality interactive labs and lectures covering Reflected, Stored, and DOM XSS bypasses, security headers, and client audits."
        },
        {
          name: "Google XSS Game",
          url: "https://xss-game.appspot.com/",
          desc: "A set of interactive educational puzzles created by Google to practice finding and exploiting client-side XSS filters."
        },
        {
          name: "OWASP Juice Shop",
          url: "https://owasp.org/www-project-juice-shop/",
          desc: "An intentionally vulnerable, modern web application designed for capture-the-flag exercises and local secure coding practice."
        }
      ]
    },
    {
      title: "Browser Security & Secure JavaScript",
      items: [
        {
          name: "MDN: Subresource Integrity (SRI)",
          url: "https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity",
          desc: "Explains how SRI hashes verify external script and stylesheet integrity, preventing supply-chain compromises of CDN-hosted assets."
        },
        {
          name: "MDN: Trusted Types API",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API",
          desc: "Complete API reference for Trusted Types, the browser feature that eliminates DOM XSS by enforcing typed sink assignments."
        },
        {
          name: "Snyk: JavaScript Security Best Practices",
          url: "https://snyk.io/learn/javascript-security/",
          desc: "Practical guide covering prototype pollution, dependency vulnerabilities, secrets management, and secure npm configuration."
        }
      ]
    },
    {
      title: "Content Security Policy Resources",
      items: [
        {
          name: "CSP Evaluator by Google",
          url: "https://csp-evaluator.withgoogle.com/",
          desc: "Google's free tool that analyses your Content Security Policy header and identifies weaknesses, misconfigurations, and bypass vectors."
        },
        {
          name: "Report URI — CSP Wizard",
          url: "https://report-uri.com/home/generate",
          desc: "Interactive CSP header generator and real-time reporting service for monitoring policy violations in production environments."
        },
        {
          name: "Helmet.js Documentation",
          url: "https://helmetjs.github.io/",
          desc: "Official documentation for Helmet.js, the Express middleware that sets secure HTTP headers including CSP, HSTS, and X-Frame-Options."
        }
      ]
    }
  ];

  return (
    <div className="res-page animate-fade-in">
      {/* Header */}
      <header className="res-header">
        <div className="res-header__inner">
          <div className="res-header__icon">
            <FaBookReader />
          </div>
          <div>
            <h1 className="res-header__title">Learning Resources</h1>
            <p className="res-header__subtitle">
              Curated guides, cheat sheets, standards, and training platforms for cybersecurity
            </p>
          </div>
        </div>
      </header>

      {/* Resource Sections Grid */}
      <section className="res-grid">
        {resourceCategories.map((category, index) => (
          <div key={index} className="res-category-card">
            <h2 className="res-category-title">{category.title}</h2>
            <div className="res-items-list">
              {category.items.map((item, idx) => (
                <article key={idx} className="res-item">
                  <header className="res-item__header">
                    <h3 className="res-item__name">{item.name}</h3>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="res-item__link"
                      title="Open external resource"
                    >
                      Visit <HiExternalLink />
                    </a>
                  </header>
                  <p className="res-item__desc">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resources;
