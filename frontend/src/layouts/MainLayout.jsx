/**
 * MainLayout Component
 * =====================
 * This layout wraps every page of the application.
 *
 * Structure:
 *   ┌─────────────────────┐
 *   │      Navbar          │
 *   ├─────────────────────┤
 *   │  <Outlet /> (page)  │  ← React Router renders the matched
 *   │                     │    route's component here.
 *   ├─────────────────────┤
 *   │      Footer          │
 *   └─────────────────────┘
 *
 * Using React Router v7's `<Outlet />` component, the layout
 * automatically renders whatever child route is currently active.
 *
 * Location: src/layouts/MainLayout.jsx
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      {/* Top navigation — always visible */}
      <Navbar />

      {/* Main content area — filled by the active route's page component */}
      <main>
        <Outlet />
      </main>

      {/* Bottom footer — always visible */}
      <Footer />
    </>
  );
};

export default MainLayout;
