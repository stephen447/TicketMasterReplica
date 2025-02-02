"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get event details for event id
router.get("/", (req, res) => { });
// Creates a new event
router.post("/", (req, res) => { });
// Updates an event
router.put("/", (req, res) => { });
// Deletes an event
router.delete("/", (req, res) => { });
// Gets featured adverts
router.get("/featured", (req, res) => { });
// Gets popular events
router.get("/popular", (req, res) => { });
// Searches for events
router.get("/search", (req, res) => { });
exports.default = router;
