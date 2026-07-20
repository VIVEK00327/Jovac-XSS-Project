/**
 * Home Page
 * ==========
 * The landing page / dashboard for the XSS Learning Lab.
 *
 * Sections:
 *   1. Hero — title, description, and "educational project" badge.
 *   2. Cards Grid — one card per XSS type with a description,
 *      tags, and a "Learn" button linking to the respective page.
 *
 * Location: src/pages/Home.jsx
 */

import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { HiShieldExclamation } from "react-icons/hi2";
import { BiReflectHorizontal } from "react-icons/bi";
import { FaDatabase, FaCode } from "react-icons/fa";

const Home = () => {
  /**
   * Card data array.
   * Each object holds everything needed to render a card.
   * When we add new XSS types, we simply extend this array.
   */
  const cards = [
    {
      id: "reflected",
      title: "Reflected XSS",
      description:
        "Understand how user input is reflected back from the server without sanitisation, allowing malicious scripts to execute in the victim's browser.",
      tags: ["url injection", "query params", "server reflection"],
      icon: <BiReflectHorizontal />,
      path: "/reflected-xss",
      modifier: "card--reflected",
    },
    {
      id: "stored",
      title: "Stored XSS",
      description:
        "Explore how malicious scripts can be permanently stored on a server (e.g. in a database) and served to every user who views the affected page.",
      tags: ["persistent", "database", "comments"],
      icon: <FaDatabase />,
      path: "/stored-xss",
      modifier: "card--stored",
    },
    {
      id: "dom",
      title: "DOM Based XSS",
      description:
        "Learn how client-side JavaScript can be exploited when it unsafely processes data from the DOM, without any server-side involvement.",
      tags: ["client-side", "javascript", "dom manipulation"],
      icon: <FaCode />,
      path: "/dom-xss",
      modifier: "card--dom",
    },
  ];

  return (
    <>
      {/* ====== Hero Section ====== */}
      <section className="hero">
        {/* Badge above the title */}
        <div className="hero__badge">
          <HiShieldExclamation />
          Educational Cybersecurity Project
        </div>

        {/* Main heading */}
        <h1 className="hero__title">
          Welcome to{" "}
          <span className="hero__title-highlight">XSS Learning Lab</span>
        </h1>

        {/* Sub-heading description */}
        <p className="hero__subtitle">
          Learn Cross-Site Scripting vulnerabilities and prevention techniques
          through interactive, side-by-side demos of vulnerable and secure
          implementations.
        </p>
      </section>

      {/* ====== Cards Grid ====== */}
      <section className="cards-grid">
        {cards.map((card) => (
          <article key={card.id} className={`card ${card.modifier}`}>
            {/* Icon */}
            <div className="card__icon-wrapper">{card.icon}</div>

            {/* Title */}
            <h2 className="card__title">{card.title}</h2>

            {/* Description */}
            <p className="card__description">{card.description}</p>

            {/* Tags */}
            <div className="card__tags">
              {card.tags.map((tag) => (
                <span key={tag} className="card__tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* "Learn" button — navigates to the XSS demo page */}
            <Link to={card.path} className="btn btn--primary">
              Start Learning <HiArrowRight />
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default Home;
