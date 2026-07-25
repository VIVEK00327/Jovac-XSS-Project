// ============================================
// Comment.js — Mongoose Model for Stored XSS Demo
// ============================================
// This model represents a user comment stored in MongoDB.
//
// Stored XSS explanation:
//   Unlike Reflected XSS (which never hits the database),
//   Stored XSS saves the malicious payload to the database.
//   Every user who later views those comments receives the
//   payload — making it far more dangerous and widespread.
//
// The `type` field marks whether the comment was submitted
// via the VULNERABLE route (no sanitisation) or the SECURE
// route (HTML entity escaping applied before storage).
//
// Collection: "comments" (Mongoose pluralises the model name)
// ============================================

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    /**
     * username
     * The display name of the commenter.
     * In the vulnerable panel: stored raw (may contain XSS).
     * In the secure panel:     HTML-entity-escaped before storage.
     */
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [50, "Username cannot exceed 50 characters"],
    },

    /**
     * content
     * The comment body — the primary XSS attack vector.
     * In the vulnerable panel: raw content written to DB → executed in browser.
     * In the secure panel:     encoded content → browser shows it as plain text.
     */
    content: {
      type: String,
      required: [true, "Comment content is required"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },

    /**
     * type
     * Distinguishes which panel created this comment.
     * Used by the frontend to separate display and by the
     * DELETE /api/xss/stored/comments?type=... endpoint
     * to clear only one panel's data.
     *
     * Values: "vulnerable" | "secure"
     */
    type: {
      type: String,
      enum: ["vulnerable", "secure"],
      required: [true, "Comment type is required"],
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields.
    // `createdAt` is used to sort comments newest-first.
    timestamps: true,
  }
);

// Create and export the model.
// Mongoose maps "Comment" → "comments" collection in MongoDB.
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
