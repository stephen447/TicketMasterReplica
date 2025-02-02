import express from "express";
import userRoutes from "./routes/user";
import dotenv from "dotenv"; // ES6 import
dotenv.config(); // Load the .env file
import sequelize from "./db.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync({ force: true }).then(() => {
      console.log("Database & tables created!");
    });
    console.log("✅ Database synchronized.");
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
  }
});
