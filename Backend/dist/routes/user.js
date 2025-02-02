"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Gets a user info using the passed token
router.get("/", (req, res) => { });
// Registers a new user
// Updates user info using the passed token
router.put("/", (req, res) => { });
// Deletes user
router.delete("/", (req, res) => { });
// Logs in a user
router.post("/login", (req, res) => { });
// logs out a user
router.post("/logout", (req, res) => { });
exports.default = router;
