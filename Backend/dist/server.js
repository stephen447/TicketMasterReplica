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
const dotenv_1 = __importDefault(require("dotenv")); // ES6 import
dotenv_1.default.config(); // Load the .env file
const db_js_1 = __importDefault(require("./db.js"));
console.log("DB_HOST", process.env.DB_HOST);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Sample route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Start the server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${PORT}`);
    try {
        yield db_js_1.default.sync({ force: true }).then(() => {
            console.log("Database & tables created!");
        });
        console.log("✅ Database synchronized.");
    }
    catch (error) {
        console.error("❌ Database synchronization failed:", error);
    }
}));
