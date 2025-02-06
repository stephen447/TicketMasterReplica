"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const event_1 = __importDefault(require("./routes/event"));
const db_1 = __importDefault(require("./db"));
const swagger_1 = require("./swagger");
dotenv_1.default.config(); // Load .env variables
const app = (0, express_1.default)();
exports.app = app;
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/events", event_1.default);
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
let server = null; // Store server instance for graceful shutdown
const startServer = (port) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync({ force: true }); // Sync database once
        console.log("✅ Database & tables created!");
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
        return server;
    }
    catch (error) {
        console.error("Database synchronization failed:", error);
        process.exit(1);
    }
});
exports.startServer = startServer;
const stopServer = () => __awaiter(void 0, void 0, void 0, function* () {
    if (server) {
        server.close(() => {
            console.log("Server stopped");
        });
    }
});
exports.stopServer = stopServer;
// Start server only when running directly
if (require.main === module) {
    startServer(PORT);
}
