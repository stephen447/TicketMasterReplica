import express from "express";
import dotenv from "dotenv";
import eventRoutes from "./routes/event";
import ticketRoutes from "./routes/ticket";
import venueRoutes from "./routes/venue";
import userRoutes from "./routes/user";
import sequelize from "./db";
import { Server } from "http";
import { swaggerUi, swaggerSpec } from "./swagger";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config(); // Load .env variables

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // This enables JSON body parsing
app.use(express.urlencoded({ extended: true })); // Enable form data parsing
app.use(cookieParser());

// CORS
const allowedOrigins = ["http://localhost:3001"]; // Replace with your actual frontend URL

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies (for JWT HttpOnly)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Routes
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);
app.use("/venues", venueRoutes);
app.use("/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let server: Server | null = null; // Store server instance for graceful shutdown

const startServer = async (port: number): Promise<Server> => {
  try {
    await sequelize.sync({ force: true }); // Sync database once
    console.log("Database & tables created!");

    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    return server;
  } catch (error) {
    console.error("Database synchronization failed:", error);
    process.exit(1);
  }
};

const stopServer = async () => {
  if (server) {
    server.close(() => {
      console.log("Server stopped");
    });
  }
};

// Start server only when running directly
if (require.main === module) {
  startServer(PORT);
}

export { app, startServer, stopServer };
