/**
 * CodeBlock — Reusable Syntax-Highlighted Code Display
 * ======================================================
 * Renders a terminal-style code block with a title bar,
 * coloured dot, and file name label. Used across Prevention,
 * Comparison, and other educational pages.
 *
 * Props:
 *   fileName   (string)  — label shown in the title bar (e.g. "server.js")
 *   code       (string)  — the code snippet to display
 *   accentColor (string) — CSS colour for the dot indicator
 *                          (defaults to var(--accent-green))
 *
 * Location: src/components/CodeBlock.jsx
 */

const CodeBlock = ({ fileName = "code", code = "", accentColor = "var(--accent-green)" }) => {
  return (
    <div className="codeblock">
      {/* Title bar with dot indicator and file name */}
      <div className="codeblock__bar">
        <span
          className="codeblock__dot"
          style={{ background: accentColor }}
        />
        <span className="codeblock__file-name">{fileName}</span>
      </div>

      {/* Code content */}
      <pre className="codeblock__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
