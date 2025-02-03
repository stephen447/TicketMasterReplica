import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import { Event } from "./models/event";
import sequelize from "./db";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Sync database and start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await sequelize.sync({ force: true }); // Force will drop and recreate tables
    console.log("✅ Database & tables created!");
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
  }
});
