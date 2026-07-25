/**
 * Quiz.jsx — Interactive XSS & Security Quiz Page
 * ===================================================
 * Part of Phase 6: XSS Learning Lab Platform.
 * Offers a 15-question interactive quiz testing XSS categories,
 * prevention, OWASP injection concepts, and browser defenses.
 *
 * Location: src/pages/Quiz.jsx
 */

import { useState } from "react";
import { HiCheckCircle, HiXCircle, HiRefresh, HiQuestionMarkCircle, HiChevronRight } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";

const Quiz = () => {
  const questions = [
    {
      question: "What is the primary difference between Reflected and Stored XSS?",
      options: [
        "Reflected XSS is saved inside the database, while Stored XSS is not.",
        "Reflected XSS payload is sent in the immediate request (like a URL parameter), while Stored XSS is persisted in the database.",
        "Reflected XSS runs server-side, whereas Stored XSS executes entirely on client-side JS.",
        "Reflected XSS does not require HTML parsing."
      ],
      correctAnswer: 1,
      explanation: "Reflected XSS is non-persistent; the payload is reflected from the request immediately. Stored XSS is persistent; the payload is stored on the server (like in a database) and sent to every visitor who loads the page."
    },
    {
      question: "Where does DOM-based XSS execute?",
      options: [
        "Inside the Node.js/Express backend controllers.",
        "On the MongoDB database cluster.",
        "Entirely inside the client-side browser JavaScript and DOM.",
        "At the DNS server layer."
      ],
      correctAnswer: 2,
      explanation: "DOM-based XSS is unique because the injection vulnerability is entirely in the client-side JavaScript files. The payload is read from a source (like location.hash) and parsed inside an execution sink (like innerHTML) directly in the browser."
    },
    {
      question: "Which of the following DOM properties is an UNSAFE sink that parses strings as HTML?",
      options: [
        "element.textContent",
        "element.innerHTML",
        "element.innerText",
        "element.className"
      ],
      correctAnswer: 1,
      explanation: "Writing untrusted input directly to innerHTML is the classic cause of DOM XSS. The browser parses the text string as active HTML code, allowing attackers to inject elements like <img src=x onerror=...> that run script code."
    },
    {
      question: "How does React help prevent Reflected/Stored XSS by default?",
      options: [
        "By filtering scripts using a cloud Web Application Firewall (WAF).",
        "By blocking client requests that contain the '<' character.",
        "By HTML-encoding all dynamic variables bound inside standard JSX curly braces {}.",
        "By enforcing strict Content Security Policies dynamically."
      ],
      correctAnswer: 2,
      explanation: "React automatically escapes dynamic strings rendered inside JSX curly braces {} before inserting them into the DOM, translating characters like < to &lt;. This treats values as plain text instead of executable HTML markup."
    },
    {
      question: "What security benefit does the 'HttpOnly' cookie flag provide?",
      options: [
        "It prevents the cookie from being transmitted over unencrypted HTTP (port 80) links.",
        "It blocks client-side JavaScript (e.g. document.cookie) from accessing the cookie.",
        "It forces the cookie to expire as soon as the browser tab is closed.",
        "It restricts cookie access to APIs from the same subdomain only."
      ],
      correctAnswer: 1,
      explanation: "Marking a session or token cookie as HttpOnly blocks access via JavaScript. If an attacker executes an XSS payload, they cannot steal this cookie via document.cookie, making session hijacking much more difficult."
    },
    {
      question: "Content Security Policy (CSP) is delivered to the browser using what?",
      options: [
        "A script variable like window.cspConfig.",
        "An HTTP response header or HTML <meta> tag.",
        "A database schema property.",
        "An encrypted JSON payload."
      ],
      correctAnswer: 1,
      explanation: "CSP is set by the server using the Content-Security-Policy HTTP response header (or within a <meta http-equiv='Content-Security-Policy'> tag). It tells the browser which domains and script sources are trusted."
    },
    {
      question: "If a server naively deletes '<script>' once without recursion, which payload bypasses this?",
      options: [
        "&lt;script&gt;alert(1)&lt;/script&gt;",
        "javascript:alert(1)",
        "<scr<script>ipt>alert(1)</script>",
        "<img src=x onerror=alert(1)>"
      ],
      correctAnswer: 2,
      explanation: "If the server performs a single string deletion of '<script>', removing the inner tag in '<scr<script>ipt>' leaves behind the letters 's','c','r','i','p','t', which merge into a valid '<script>' tag in the final output."
    },
    {
      question: "Under which OWASP Top 10 category is Cross-Site Scripting classified in the latest standards?",
      options: [
        "A01:2021-Broken Access Control",
        "A05:2021-Security Misconfiguration",
        "A03:2021-Injection",
        "A07:2021-Identification and Authentication Failures"
      ],
      correctAnswer: 2,
      explanation: "XSS is fundamentally an injection attack where untrusted data is injected into HTML contexts. Thus, it falls under OWASP category A03:2021-Injection."
    },
    {
      question: "Which characters must be escaped to prevent basic HTML injection?",
      options: [
        "&, <, >, \", '",
        "%, $, #, *, !",
        "[,, ], {, }, (",
        "\\, /, ;, :, ?"
      ],
      correctAnswer: 0,
      explanation: "Escaping &, <, >, \", and ' to their entity equivalents (&amp;, &lt;, &gt;, &quot;, &#x27;) is the foundation of output encoding. This prevents users from closing tags, opening new ones, or breaking out of attribute strings."
    },
    {
      question: "Why are input denylists (blocking specific bad words) considered weak defense?",
      options: [
        "They use too much CPU memory to run.",
        "Attackers can easily bypass lists using letter casing, alternative tags, event handlers, or encoding.",
        "Browsers disable denylists by default.",
        "Database drivers cannot index lists."
      ],
      correctAnswer: 1,
      explanation: "Denylists are notoriously difficult to maintain because there are countless ways to represent script payloads. Allowlisting (accepting only known good formats) is always preferred over denylisting."
    },
    {
      question: "Which modern browser API prevents DOM XSS by forcing developers to use sanitised objects for sinks?",
      options: [
        "LocalStorage API",
        "Trusted Types API",
        "Service Workers API",
        "Web Cryptography API"
      ],
      correctAnswer: 1,
      explanation: "Trusted Types blocks direct string assignments to sinks (like innerHTML) and forces developers to use TrustedHTML objects created by verified security policies, eliminating string-injection vectors."
    },
    {
      question: "According to the principle of least privilege, how should the backend database user connect?",
      options: [
        "As root/administrator to avoid permission errors.",
        "With a limited account having only the read/write privileges needed for specific tables/collections.",
        "Without any authentication for faster query speed.",
        "Using a dynamic system administrator role."
      ],
      correctAnswer: 1,
      explanation: "Connecting with a limited user account ensures that if the database credentials are leaked or database injection occurs, the attacker cannot access or modify tables outside of the application's immediate scopes."
    },
    {
      question: "What is the primary security consequence of a successful session cookie theft via XSS?",
      options: [
        "The attacker can format the server's database files.",
        "The attacker can steal the client's desktop wallpaper.",
        "Account Takeover (session hijacking) by sending the cookie to impersonate the victim.",
        "It breaks the site's SSL handshake."
      ],
      correctAnswer: 2,
      explanation: "Cookies often store session IDs. If an attacker retrieves this cookie via script, they can send it in their own browser requests, hijacking the session and logging in as the victim without knowing their password."
    },
    {
      question: "Which of the following client-side DOM sinks is safe for rendering text?",
      options: [
        "element.innerHTML",
        "document.write()",
        "element.textContent",
        "window.location.href"
      ],
      correctAnswer: 2,
      explanation: "element.textContent assigns input purely as text nodes. Even if the text contains script tags, the browser displays them visually as plain text rather than parsing them as HTML tags."
    },
    {
      question: "What protection is provided by setting SameSite=Lax on cookies?",
      options: [
        "It stops the cookie from being sent on cross-site requests (e.g. following external links), mitigating CSRF attacks.",
        "It prevents JavaScript from reading the cookie.",
        "It makes the cookie expire automatically after 5 minutes.",
        "It restricts cookie access to HTTPS connections only."
      ],
      correctAnswer: 0,
      explanation: "SameSite=Lax blocks cookies from being sent in cross-site requests (with exceptions for standard top-level navigations), which blocks attackers from executing unauthorized actions via Cross-Site Request Forgery (CSRF)."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionClick = (idx) => {
    if (showAnswer) return; // locked
    setSelectedOpt(idx);
    setShowAnswer(true);

    if (idx === questions[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowAnswer(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = questions[currentIdx];
  const progressPercent = ((currentIdx) / questions.length) * 100;

  return (
    <div className="quiz-page animate-fade-in">
      {/* Header */}
      <header className="quiz-header">
        <div className="quiz-header__inner">
          <div className="quiz-header__icon">
            <FaGraduationCap />
          </div>
          <div>
            <h1 className="quiz-header__title">Security Quiz</h1>
            <p className="quiz-header__subtitle">
              Test your understanding of XSS vectors, prevention, and secure development
            </p>
          </div>
        </div>
      </header>

      {/* Quiz Card */}
      <section className="quiz-card">
        {!quizFinished ? (
          <div>
            {/* Progress bar */}
            <div className="quiz-progress-container">
              <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }} />
              <span className="quiz-progress-text">
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="quiz-question">{currentQuestion.question}</h2>

            {/* Options List */}
            <div className="quiz-options">
              {currentQuestion.options.map((opt, idx) => {
                let btnClass = "quiz-option";

                if (showAnswer) {
                  if (idx === currentQuestion.correctAnswer) {
                    btnClass += " quiz-option--correct";
                  } else if (idx === selectedOpt) {
                    btnClass += " quiz-option--incorrect";
                  } else {
                    btnClass += " quiz-option--disabled";
                  }
                } else if (selectedOpt === idx) {
                  btnClass += " quiz-option--selected";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showAnswer}
                  >
                    <span className="quiz-option__indicator">
                      {showAnswer && idx === currentQuestion.correctAnswer && <HiCheckCircle />}
                      {showAnswer && idx === selectedOpt && idx !== currentQuestion.correctAnswer && <HiXCircle />}
                      {!showAnswer && String.fromCharCode(65 + idx)}
                    </span>
                    <span className="quiz-option__text">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            {showAnswer && (
              <div className="quiz-feedback animate-fade-in">
                <div className="quiz-feedback__header">
                  <HiQuestionMarkCircle />
                  <span>Explanation</span>
                </div>
                <p className="quiz-feedback__text">{currentQuestion.explanation}</p>

                <div className="quiz-actions">
                  <button type="button" className="quiz-next-btn" onClick={handleNext}>
                    Next Question <HiChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="quiz-result animate-fade-in">
            <h2 className="quiz-result__title">Quiz Completed!</h2>
            <div className="quiz-result__score-wrap">
              <span className="quiz-result__score-num">{score}</span>
              <span className="quiz-result__score-total">/ {questions.length}</span>
            </div>
            <p className="quiz-result__feedback-msg">
              {score === questions.length
                ? "Perfect score! You are an XSS Defense Expert! 🛡️"
                : score >= 12
                ? "Excellent job! You have a solid grasp of XSS concepts. 🛡️"
                : score >= 8
                ? "Good effort! Review the Prevention and Comparison pages to strengthen your score."
                : "Keep learning! Re-read the explanations and try again."}
            </p>

            <button type="button" className="quiz-restart-btn" onClick={restartQuiz}>
              <HiRefresh /> Restart Quiz
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Quiz;
