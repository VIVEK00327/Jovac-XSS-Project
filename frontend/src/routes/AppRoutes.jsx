/**
 * AppRoutes — Application Routing Configuration
 * ================================================
 * Defines all routes using React Router v7 (react-router-dom).
 *
 * Route structure:
 *   /                → Home page (dashboard)
 *   /reflected-xss   → Reflected XSS demo
 *   /stored-xss      → Stored XSS demo
 *   /dom-xss         → DOM Based XSS demo
 *   *                → 404 Not Found
 *
 * All routes are wrapped inside <MainLayout /> which provides
 * the Navbar and Footer on every page.
 *
 * Location: src/routes/AppRoutes.jsx
 */

import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import ReflectedXSS from "../pages/ReflectedXSS";
import StoredXSS from "../pages/StoredXSS";
import DOMXSS from "../pages/DOMXSS";
import Comparison from "../pages/Comparison";
import Prevention from "../pages/Prevention";
import PayloadLab from "../pages/PayloadLab";
import Quiz from "../pages/Quiz";
import Resources from "../pages/Resources";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/*
        All pages share the MainLayout (Navbar + Footer).
        The layout uses <Outlet /> to render whichever
        child route matches the current URL.
      */}
      <Route element={<MainLayout />}>
        {/* Home — the landing dashboard */}
        <Route path="/" element={<Home />} />

        {/* XSS demo pages */}
        <Route path="/reflected-xss" element={<ReflectedXSS />} />
        <Route path="/stored-xss" element={<StoredXSS />} />
        <Route path="/dom-xss" element={<DOMXSS />} />

        {/* Educational resource pages */}
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/prevention" element={<Prevention />} />
        <Route path="/payload-lab" element={<PayloadLab />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />

        {/* Catch-all — 404 page for any unmatched route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
