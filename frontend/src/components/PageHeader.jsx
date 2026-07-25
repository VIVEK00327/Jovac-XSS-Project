/**
 * PageHeader — Reusable Page Header Component
 * ==============================================
 * Renders the standard page header used across all Phase 6
 * educational pages. Provides a consistent layout with an
 * icon box, title, and subtitle.
 *
 * Props:
 *   icon       (ReactNode) — icon component to display (e.g. <FaBalanceScale />)
 *   title      (string)    — main heading text
 *   subtitle   (string)    — description text below the title
 *   className  (string)    — optional additional CSS class for the wrapper
 *
 * Location: src/components/PageHeader.jsx
 */

const PageHeader = ({ icon, title, subtitle, className = "" }) => {
  return (
    <header className={`page-header ${className}`}>
      <div className="page-header__inner">
        {/* Icon container */}
        <div className="page-header__icon">
          {icon}
        </div>

        {/* Title and subtitle */}
        <div>
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
