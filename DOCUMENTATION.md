# 📚 Technical Documentation — XSS Learning Lab

This document provides in-depth technical details on the architecture, API endpoints, component design, database schema, and security mechanisms implemented in the XSS Learning Lab.

---

## 🏗️ Component Architecture & Layout
The frontend client uses React components to build a responsive, single-page application (SPA).

### Key Reusable Components
1. **PageHeader (`src/components/PageHeader.jsx`)**
   - Renders page-level title, description, and accent-colored icon box.
2. **CodeBlock (`src/components/CodeBlock.jsx`)**
   - Renders a terminal-like container with a file name bar, color-coded status dot, and preformatted code block.
3. **ErrorBoundary (`src/components/ErrorBoundary.jsx`)**
   - Catches JavaScript errors during page rendering and displays an application error panel with a diagnostic stack trace and resetting action.
4. **Loader (`src/components/Loader.jsx`)**
   - Displays a custom, rotating spinner with an optional customizable text prompt.
5. **SkeletonLoader (`src/components/SkeletonLoader.jsx`)**
   - Renders pulsing content boxes during asynchronous network request states.

---

## 🛢️ Database Schema
Data persistence is handled by MongoDB using Mongoose schemas.

### Comments Collection (`Comment` Model)
Represents user-submitted comments stored in MongoDB.
```javascript
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["vulnerable", "secure"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
```

---

## 📡 API Endpoints Reference

### 1. Health Status check
- **GET `/api/health`**
  - Response: `{ status: "ok", uptime: 124.5, timestamp: "2026-07-25..." }`
  - Purpose: Confirms server runtime and DB connection availability.

### 2. Stored Comments API
- **GET `/api/xss/stored/comments`**
  - Retrieves all comments from the database.
  - Response: `{ comments: [...] }`
- **POST `/api/xss/stored/vulnerable`**
  - Inserts a comment without sanitisation (stored raw).
  - Body: `{ username, content }`
- **POST `/api/xss/stored/secure`**
  - Escapes HTML special characters server-side before storing.
  - Body: `{ username, content }`
- **DELETE `/api/xss/stored/comments`**
  - Clears comments. Query param: `?type=vulnerable` or `?type=secure`

### 3. Reflected Endpoint (Simulated)
- **POST `/api/xss/reflected/secure`**
  - Validates and escapes input fields before sending response variables.
  - Body: `{ query }`

---

## 🔄 Core Application Flows

### 1. Reflected XSS Flow (Vulnerable Path)
```
1. Attacker sends a link containing '<script>alert(1)</script>' in the query parameters.
2. React parses this query param and sets it into the DOM using an unescaped element.
3. The victim opens the link and the script automatically runs.
```

### 2. Stored XSS Flow (Secure Path)
```
1. User submits input to '/api/xss/stored/secure'.
2. Backend controller applies HTML entity escaping.
3. MongoDB stores: '&lt;script&gt;alert(1)&lt;/script&gt;'.
4. Frontend fetches comments and renders values safely as standard JSX text nodes.
```

---

## 🛡️ Implemented Security Measures
1. **Context-Aware Encoding**: Escapes `<`, `>`, `&`, `"`, `'`, and `/` at critical boundaries.
2. **CORS Restrictions**: Configurable via `CORS_ORIGIN` variables.
3. **Helmet Header Protection**: Activates clickjacking protection (`X-Frame-Options: DENY`), MIME sniffing suppression (`X-Content-Type-Options: nosniff`), and server runtime concealment.
4. **Input Constraints**: Implements request limiters (10kb body max) and text lengths to protect backend storage.
