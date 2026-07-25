/**
 * ServerError Page (500)
 * =======================
 * Displayed when the application fails to communicate with the backend
 * or when the backend returns a 500 Internal Server Error.
 *
 * Location: src/pages/ServerError.jsx
 */

import { Link } from "react-router-dom";
import { HiArrowLeft, HiRefresh } from "react-icons/hi";
import { HiCircleStack } from "react-icons/hi2";

const ServerError = ({ message, onRetry }) => {
  return (
    <section className="server-error" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "75vh", textAlign: "center", padding: "2rem 1.5rem", animation: "fadeInUp 0.5s ease" }}>
      <div className="server-error__icon" style={{ fontSize: "4.5rem", color: "var(--accent-red)", marginBottom: "1.5rem" }}>
        <HiCircleStack />
      </div>
      <h1 className="server-error__title" style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "0.5rem" }}>
        500 - Database Connection Error
      </h1>
      <p className="server-error__subtitle" style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: "1.65", marginBottom: "2rem" }}>
        {message || "The lab backend or database server is currently unreachable. Make sure you started the backend server using 'npm run dev' inside the backend folder."}
      </p>
      
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {onRetry && (
          <button onClick={onRetry} className="btn btn--primary">
            <HiRefresh /> Retry Connection
          </button>
        )}
        <Link to="/" className="btn btn--outline">
          <HiArrowLeft /> Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ServerError;
