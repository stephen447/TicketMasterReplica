import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./routes/event";
import sequelize from "./db";
import { Server } from "http"; // Import Server type

dotenv.config(); // Load .env variables

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/events", eventRoutes);

let server: Server | null = null; // Store server instance for graceful shutdown

const startServer = async (port: number): Promise<Server> => {
  try {
    await sequelize.sync({ force: true }); // Sync database once
    console.log("✅ Database & tables created!");

    server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

    return server;
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
    process.exit(1);
  }
};

const stopServer = async () => {
  if (server) {
    server.close(() => {
      console.log("🛑 Server stopped");
    });
  }
};

// Start server only when running directly
if (require.main === module) {
  startServer(PORT);
}

export { app, startServer, stopServer };
