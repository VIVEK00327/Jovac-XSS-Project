// ============================================
// Comment.js - Mongoose Model for Comments
// ============================================
// Why this model?
// This will be used for the "Stored XSS" demonstration.
// In Stored XSS, malicious scripts are saved to the database
// (e.g., in a comment) and executed when other users view them.
//
// For now, this is just the schema foundation.
// Attack and defense logic will be added in future steps.
// ============================================

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // The username of the person posting the comment
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [50, "Username cannot exceed 50 characters"],
    },

    // The comment content - this is where XSS payloads could be injected
    content: {
      type: String,
      required: [true, "Comment content is required"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the model
// "Comment" becomes the "comments" collection in MongoDB
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
