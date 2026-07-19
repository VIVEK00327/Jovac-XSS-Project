// ============================================
// db.js - MongoDB Connection Configuration
// ============================================
// Why separate this file?
// Database connection logic is isolated here so that:
// 1. app.js stays clean and focused on Express setup
// 2. We can reuse this connection in tests or scripts
// 3. Connection errors are handled in one place
// ============================================

import mongoose from "mongoose";
import { MESSAGES } from "../utils/constants.js";

/**
 * Connects to MongoDB using the URI from environment variables.
 * Mongoose handles connection pooling and reconnection automatically.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ ${MESSAGES.DB_CONNECTED}: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ ${MESSAGES.DB_ERROR}: ${error.message}`);

    // Exit the process with failure code (1)
    // We exit because the app can't function without a database
    process.exit(1);
  }
};

export default connectDB;
