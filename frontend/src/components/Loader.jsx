/**
 * Loader Component
 * =================
 * A reusable loading spinner shown while data is being fetched
 * or a page is being prepared.
 *
 * Props:
 *   message (string) — optional text displayed beneath the spinner.
 *
 * Location: src/components/Loader.jsx
 */

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      {/* Animated spinning ring */}
      <div className="loader-spinner" />

      {/* Status message */}
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default Loader;
