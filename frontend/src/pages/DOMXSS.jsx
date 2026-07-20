/**
 * DOM Based XSS — Placeholder Page
 * ==================================
 * Temporary landing page displayed until the DOM-based XSS
 * demo functionality is implemented in a future phase.
 *
 * Location: src/pages/DOMXSS.jsx
 */

import { FaCode } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

const DOMXSS = () => {
  return (
    <section className="placeholder-page">
      {/* Icon representing this XSS type */}
      <div className="placeholder-page__icon placeholder-page__icon--dom">
        <FaCode />
      </div>

      {/* Page title */}
      <h1 className="placeholder-page__title">DOM Based XSS Demo</h1>

      {/* Description */}
      <p className="placeholder-page__subtitle">
        This interactive demo will show how client-side JavaScript can be exploited
        through unsafe DOM manipulation, and how to write secure code against it.
      </p>

      {/* "Coming soon" badge */}
      <span className="placeholder-page__badge">
        <HiClock /> Coming Soon
      </span>
    </section>
  );
};

export default DOMXSS;
