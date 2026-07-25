/**
 * ErrorBoundary Component
 * =======================
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 *
 * Location: src/components/ErrorBoundary.jsx
 */

import React from "react";
import { HiExclamationTriangle } from "react-icons/hi2";
import { HiRefresh } from "react-icons/hi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="server-error" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "2rem 1.5rem" }}>
          <div className="server-error__icon" style={{ fontSize: "4rem", color: "var(--accent-red)", marginBottom: "1.5rem" }}>
            <HiExclamationTriangle />
          </div>
          <h1 className="server-error__title" style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-heading)", marginBottom: "1rem" }}>
            Application Error
          </h1>
          <p className="server-error__subtitle" style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "500px", lineHeight: "1.6", marginBottom: "2rem" }}>
            An unexpected error occurred in the user interface. Don't worry, the security lab runs on sandboxed modules.
          </p>
          {this.state.error && (
            <pre style={{ background: "rgba(248, 113, 113, 0.05)", border: "1px solid rgba(248, 113, 113, 0.2)", padding: "1rem", borderRadius: "var(--radius-sm)", color: "var(--accent-red)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", maxWidth: "90%", overflowX: "auto", textAlign: "left", marginBottom: "2rem" }}>
              <code>{this.state.error.toString()}</code>
            </pre>
          )}
          <button onClick={this.handleReset} className="btn btn--primary">
            <HiRefresh /> Reset & Go Home
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
