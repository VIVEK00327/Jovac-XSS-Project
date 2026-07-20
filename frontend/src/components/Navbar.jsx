/**
 * Navbar Component
 * =================
 * The top navigation bar visible on every page.
 *
 * Features:
 *   - Brand logo / title linking to home.
 *   - Desktop navigation links with active-state highlighting.
 *   - Mobile hamburger toggle that expands a vertical menu.
 *
 * React Router's `NavLink` automatically adds the `--active` class
 * to the currently matched route so users always know where they are.
 *
 * Location: src/components/Navbar.jsx
 */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  // Controls visibility of the mobile navigation menu
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Navigation items array.
   * Adding a new page? Just append an object here.
   */
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/reflected-xss", label: "Reflected XSS" },
    { path: "/stored-xss", label: "Stored XSS" },
    { path: "/dom-xss", label: "DOM XSS" },
  ];

  /**
   * Helper that returns the correct CSS class for NavLink.
   * React Router passes `{ isActive }` so we can style the
   * currently active link differently.
   */
  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? " navbar__link--active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* -------- Brand -------- */}
        <NavLink to="/" className="navbar__brand" onClick={() => setMobileOpen(false)}>
          <HiShieldCheck className="navbar__brand-icon" />
          <span>XSS Lab</span>
        </NavLink>

        {/* -------- Desktop Links -------- */}
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={linkClass} end={item.path === "/"}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* -------- Mobile Toggle Button -------- */}
        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* -------- Mobile Menu -------- */}
      <ul className={`navbar__mobile-menu${mobileOpen ? " navbar__mobile-menu--open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={linkClass}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)} // Close menu on navigation
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
