/**
 * Stored XSS — Placeholder Page
 * ===============================
 * Temporary landing page displayed until the Stored XSS
 * demo functionality is implemented in a future phase.
 *
 * Location: src/pages/StoredXSS.jsx
 */

import { FaDatabase } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

const StoredXSS = () => {
  return (
    <section className="placeholder-page">
      {/* Icon representing this XSS type */}
      <div className="placeholder-page__icon placeholder-page__icon--stored">
        <FaDatabase />
      </div>

      {/* Page title */}
      <h1 className="placeholder-page__title">Stored XSS Demo</h1>

      {/* Description */}
      <p className="placeholder-page__subtitle">
        This interactive demo will show how malicious scripts can be permanently
        stored in a database and served to every visitor, along with prevention
        techniques.
      </p>

      {/* "Coming soon" badge */}
      <span className="placeholder-page__badge">
        <HiClock /> Coming Soon
      </span>
    </section>
  );
};

export default StoredXSS;
