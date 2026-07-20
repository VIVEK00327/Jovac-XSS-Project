/**
 * main.jsx — Application Entry Point
 * =====================================
 * This is the very first file Vite loads (referenced in index.html).
 *
 * It:
 *   1. Imports the global CSS styles.
 *   2. Renders the root <App /> component into the DOM.
 *
 * React.StrictMode is enabled to help catch potential issues
 * during development (double-renders, deprecated APIs, etc.).
 *
 * Location: src/main.jsx
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
