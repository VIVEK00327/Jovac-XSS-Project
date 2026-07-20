/**
 * App.jsx — Root Application Component
 * ======================================
 * This is the top-level component rendered by main.jsx.
 *
 * Responsibilities:
 *   1. Wraps the entire app in <BrowserRouter> so React Router
 *      can manage client-side navigation.
 *   2. Initialises the <Toaster /> from react-hot-toast so
 *      toast notifications can be triggered from any component.
 *   3. Renders <AppRoutes /> which contains all page routes.
 *
 * Location: src/App.jsx
 */

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    // BrowserRouter enables client-side routing using the History API
    <BrowserRouter>
      {/* Toast notification container — appears top-center */}
      <Toaster
        position="top-center"
        toastOptions={{
          // Custom styling to match our dark cybersecurity theme
          style: {
            background: "#1a1f35",
            color: "#e2e8f0",
            border: "1px solid rgba(148, 163, 184, 0.12)",
            borderRadius: "8px",
            fontSize: "0.9rem",
          },
          // Success toasts get a cyan accent
          success: {
            iconTheme: {
              primary: "#22d3ee",
              secondary: "#0a0e1a",
            },
          },
          // Error toasts get a red accent
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#0a0e1a",
            },
          },
        }}
      />

      {/* All application routes */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
