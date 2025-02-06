import { Event } from "../models/event"; // Import the Event model
import express, { Request, Response } from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event details by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *       404:
 *         description: Event not found
 */
router.get(
  "/event/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      console.log("Get");
      const event = await Event.findByPk(req.params.id);
      res
        .status(event ? 200 : 404)
        .json(event || { message: "Event not found" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Failed to create event
 */
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

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    res
      .status(updatedEvent[0] > 0 ? 200 : 404)
      .json(updatedEvent[1][0] || { message: "Event not found" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update event" });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
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
    let events = [];
    events = query
      ? await Event.findAll({
          where: {
            title: { $iLike: `%${query}%` },
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
