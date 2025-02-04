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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const event_1 = __importDefault(require("./routes/event"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config(); // Load .env variables
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/events", event_1.default);
// Sync database and start the server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 Server running on port ${PORT}`);
    try {
        yield db_1.default.sync({ force: true }); // Force will drop and recreate tables
        console.log("✅ Database & tables created!");
    }
    catch (error) {
        console.error("❌ Database synchronization failed:", error);
    }
}));
