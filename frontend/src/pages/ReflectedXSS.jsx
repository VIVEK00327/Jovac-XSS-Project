/**
 * Reflected XSS — Placeholder Page
 * ==================================
 * Temporary landing page displayed until the Reflected XSS
 * demo functionality is implemented in a future phase.
 *
 * Location: src/pages/ReflectedXSS.jsx
 */

import { BiReflectHorizontal } from "react-icons/bi";
import { HiClock } from "react-icons/hi";

const ReflectedXSS = () => {
  return (
    <section className="placeholder-page">
      {/* Icon representing this XSS type */}
      <div className="placeholder-page__icon placeholder-page__icon--reflected">
        <BiReflectHorizontal />
      </div>

      {/* Page title */}
      <h1 className="placeholder-page__title">Reflected XSS Demo</h1>

      {/* Description */}
      <p className="placeholder-page__subtitle">
        This interactive demo will show how user-supplied input is reflected
        from the server without proper sanitisation, and how to defend against it.
      </p>

      {/* "Coming soon" badge */}
      <span className="placeholder-page__badge">
        <HiClock /> Coming Soon
      </span>
    </section>
  );
};

export default ReflectedXSS;
