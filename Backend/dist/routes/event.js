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
const event_1 = require("../models/event"); // Import the Event model
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get event details for a specific event by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = { id: req.params.id, title: "Sample Event" };
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.json(event);
    }
    catch (error) {
        console.error("Error fetching event:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
// ✅ Create a new event
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = yield event_1.Event.create(req.body);
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to create event" });
    }
}));
// ✅ Update an existing event
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEvent = yield event_1.Event.update(req.body, {
            where: { id: req.params.id },
            returning: true, // Returns updated record
        });
        if (updatedEvent[0] === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(updatedEvent[1][0]); // Return the updated event
    }
    catch (error) {
        res.status(400).json({ error: "Failed to update event" });
    }
}));
// ✅ Delete an event
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield event_1.Event.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
}));
// ✅ Get featured events (Example: return events with a 'featured' flag)
router.get("/featured", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
// ✅ Get popular events (Example: events with the most tickets sold)
router.get("/popular", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularEvents = yield event_1.Event.findAll({
            order: [["ticketsSold", "DESC"]],
            limit: 10,
        });
        res.json(popularEvents);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch popular events" });
    }
}));
// ✅ Search for events (Example: search by title or city)
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }
        const events = yield event_1.Event.findAll({
            where: {
                title: { $iLike: `%${query}%` }, // Case-insensitive search in PostgreSQL
            },
        });
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
}));
exports.default = router;
