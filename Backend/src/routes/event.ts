import { Event } from "../models/event"; // Import the Event model
import express, { Request, Response } from "express";

const router = express.Router();

// Get event details for a specific event by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.status(event ? 200 : 404).json(event || { message: "Event not found" });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Create a new event
router.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res
      .status(newEvent ? 201 : 400)
      .json(newEvent || { error: "Failed to create event" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

// Update an existing event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: { id: req.params.id },
      returning: true, // Returns updated record
    });

    res
      .status(updatedEvent[0] > 0 ? 200 : 404)
      .json(updatedEvent[1][0] || { message: "Event not found" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update event" });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });

    res
      .status(deleted ? 200 : 404)
      .json(
        deleted
          ? { message: "Event deleted successfully" }
          : { message: "Event not found" }
      );
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Get featured events (Example: return events with a 'featured' flag)
router.get("/featured", async (req, res) => {});

// Get popular events (Example: events with the most tickets sold)
router.get("/popular", async (req, res) => {});

// Search for events (Example: search by title or city)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const events = query
      ? await Event.findAll({
          where: {
            title: { $iLike: `%${query}%` }, // Case-insensitive search in PostgreSQL
          },
        })
      : [];

    res
      .status(query ? 200 : 400)
      .json(
        events.length > 0 ? events : { message: "Query parameter is required" }
      );
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
