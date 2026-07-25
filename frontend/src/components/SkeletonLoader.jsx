/**
 * SkeletonLoader Component
 * =========================
 * Renders an animated pulse skeleton preview placeholder to be shown
 * during loading states instead of a blank page, enhancing UX.
 *
 * Location: src/components/SkeletonLoader.jsx
 */

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const items = Array.from({ length: count });

  const renderSkeleton = (key) => {
    switch (type) {
      case "list":
        return (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", background: "rgba(26, 31, 53, 0.4)", marginBottom: "1rem" }} className="skeleton-pulse">
            <div style={{ width: "30%", height: "16px", background: "rgba(148, 163, 184, 0.15)", borderRadius: "4px" }} />
            <div style={{ width: "80%", height: "12px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
          </div>
        );
      case "text":
        return (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", width: "100%" }} className="skeleton-pulse">
            <div style={{ width: "100%", height: "12px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
            <div style={{ width: "95%", height: "12px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
            <div style={{ width: "70%", height: "12px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
          </div>
        );
      case "card":
      default:
        return (
          <div key={key} style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "2rem", background: "var(--bg-card)", minHeight: "220px", display: "flex", flexDirection: "column", gap: "1rem" }} className="skeleton-pulse">
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(148, 163, 184, 0.15)" }} />
            <div style={{ width: "60%", height: "20px", background: "rgba(148, 163, 184, 0.15)", borderRadius: "4px" }} />
            <div style={{ width: "100%", height: "14px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
            <div style={{ width: "85%", height: "14px", background: "rgba(148, 163, 184, 0.1)", borderRadius: "4px" }} />
          </div>
        );
    }
  };

  return (
    <>
      {items.map((_, index) => renderSkeleton(index))}
    </>
  );
};

export default SkeletonLoader;
