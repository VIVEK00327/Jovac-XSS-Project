/**
 * Not Found (404) Page
 * =====================
 * Shown when the user navigates to a route that doesn't exist.
 * Includes a large "404" heading and a link back to the home page.
 *
 * Location: src/pages/NotFound.jsx
 */

import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <section className="not-found">
      {/* Big 404 code */}
      <h1 className="not-found__code">404</h1>

      {/* Message */}
      <p className="not-found__message">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Back to home */}
      <Link to="/" className="btn btn--outline">
        <HiArrowLeft /> Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
