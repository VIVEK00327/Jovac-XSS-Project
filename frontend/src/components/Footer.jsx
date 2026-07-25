/**
 * Footer Component
 * =================
 * A simple site-wide footer displayed at the bottom of every page.
 *
 * Includes:
 *   - Copyright notice with the project name.
 *   - Educational disclaimer (important for a security-related project).
 *
 * Location: src/components/Footer.jsx
 */

import { Link } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Copyright line */}
        <p className="footer__text">
          <HiShieldCheck style={{ verticalAlign: "middle", marginRight: "0.3rem" }} />
          &copy; {new Date().getFullYear()} <span>XSS Learning Lab</span> — Educational Purpose Only
        </p>

        {/* Disclaimer */}
        <p className="footer__disclaimer">
          This project is designed for learning about web security vulnerabilities.
          Do not use these techniques on systems you do not own or have permission to test.{" "}
          <Link to="/disclaimer" style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>
            View Safety Guidelines & Legal Disclaimer
          </Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
