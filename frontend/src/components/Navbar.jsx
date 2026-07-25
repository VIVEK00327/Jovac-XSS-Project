/**
 * Navbar Component
 * =================
 * The top navigation bar visible on every page.
 *
 * Features:
 *   - Brand logo / title linking to home.
 *   - Desktop navigation links with active-state highlighting.
 *   - Links grouped into "Demos" and "Learn" sections with dividers.
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

/* Icons for navigation items */
import { HiHome, HiAcademicCap, HiBookOpen, HiInformationCircle } from "react-icons/hi";
import { BiReflectHorizontal } from "react-icons/bi";
import { FaDatabase, FaCode, FaBalanceScale, FaShieldAlt, FaFlask, FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  // Controls visibility of the mobile navigation menu
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Navigation items array — grouped into logical sections.
   * "divider" entries render a visual separator in the nav bar.
   */
  const navItems = [
    /* ── Demo Pages ── */
    { path: "/", label: "Home", icon: <HiHome /> },
    { path: "/reflected-xss", label: "Reflected XSS", icon: <BiReflectHorizontal /> },
    { path: "/stored-xss", label: "Stored XSS", icon: <FaDatabase /> },
    { path: "/dom-xss", label: "DOM XSS", icon: <FaCode /> },

    /* Visual separator between sections */
    { divider: true },

    /* ── Learning Pages ── */
    { path: "/comparison", label: "Comparison", icon: <FaBalanceScale /> },
    { path: "/prevention", label: "Prevention", icon: <FaShieldAlt /> },
    { path: "/payload-lab", label: "Payload Lab", icon: <FaFlask /> },
    { path: "/quiz", label: "Quiz", icon: <FaGraduationCap /> },
    { path: "/resources", label: "Resources", icon: <HiBookOpen /> },
    { path: "/about", label: "About", icon: <HiInformationCircle /> },
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
          {navItems.map((item, index) =>
            item.divider ? (
              /* Section divider */
              <li key={`divider-${index}`} className="navbar__divider" aria-hidden="true" />
            ) : (
              <li key={item.path}>
                <NavLink to={item.path} className={linkClass} end={item.path === "/"}>
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            )
          )}
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
        {navItems.map((item, index) =>
          item.divider ? (
            /* Section divider for mobile */
            <li key={`m-divider-${index}`} className="navbar__mobile-divider" aria-hidden="true" />
          ) : (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={linkClass}
                end={item.path === "/"}
                onClick={() => setMobileOpen(false)} // Close menu on navigation
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
