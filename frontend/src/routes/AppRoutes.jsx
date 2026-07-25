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

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

// Lazy-loaded Pages (Code-splitting)
const Home = lazy(() => import("../pages/Home"));
const ReflectedXSS = lazy(() => import("../pages/ReflectedXSS"));
const StoredXSS = lazy(() => import("../pages/StoredXSS"));
const DOMXSS = lazy(() => import("../pages/DOMXSS"));
const Comparison = lazy(() => import("../pages/Comparison"));
const Prevention = lazy(() => import("../pages/Prevention"));
const PayloadLab = lazy(() => import("../pages/PayloadLab"));
const Quiz = lazy(() => import("../pages/Quiz"));
const Resources = lazy(() => import("../pages/Resources"));
const About = lazy(() => import("../pages/About"));
const SecurityDisclaimer = lazy(() => import("../pages/SecurityDisclaimer"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader message="Initialising dashboard..." />}>
              <Home />
            </Suspense>
          }
        />

        {/* XSS demo pages */}
        <Route
          path="/reflected-xss"
          element={
            <Suspense fallback={<Loader message="Loading Reflected XSS Sandbox..." />}>
              <ReflectedXSS />
            </Suspense>
          }
        />
        <Route
          path="/stored-xss"
          element={
            <Suspense fallback={<Loader message="Loading Stored XSS Sandbox..." />}>
              <StoredXSS />
            </Suspense>
          }
        />
        <Route
          path="/dom-xss"
          element={
            <Suspense fallback={<Loader message="Loading DOM Based XSS Sandbox..." />}>
              <DOMXSS />
            </Suspense>
          }
        />

        {/* Educational resource pages */}
        <Route
          path="/comparison"
          element={
            <Suspense fallback={<Loader message="Comparing XSS Matrices..." />}>
              <Comparison />
            </Suspense>
          }
        />
        <Route
          path="/prevention"
          element={
            <Suspense fallback={<Loader message="Parsing Secure Coding Guide..." />}>
              <Prevention />
            </Suspense>
          }
        />
        <Route
          path="/payload-lab"
          element={
            <Suspense fallback={<Loader message="Opening Payload Bank..." />}>
              <PayloadLab />
            </Suspense>
          }
        />
        <Route
          path="/quiz"
          element={
            <Suspense fallback={<Loader message="Preparing Challenge Quiz..." />}>
              <Quiz />
            </Suspense>
          }
        />
        <Route
          path="/resources"
          element={
            <Suspense fallback={<Loader message="Fetching Study Material..." />}>
              <Resources />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader message="Loading Project Credits..." />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <Suspense fallback={<Loader message="Loading Legal Policies..." />}>
              <SecurityDisclaimer />
            </Suspense>
          }
        />

        {/* Catch-all — 404 page for any unmatched route */}
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader message="Navigating..." />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
