import express from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

// Add authentication middleware here

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API for managing tickets
 */

/**
 * @swagger
 * /tickets/{ticketId}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 */
router.get("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.ticketId);
    res
      .status(ticket ? 200 : 404)
      .json(ticket || { message: "Ticket not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/{ticketId}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket updated
 */
router.put("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.ticketId);
    if (ticket) await ticket.update(req.body);
    res
      .status(ticket ? 200 : 404)
      .json(ticket || { message: "Ticket not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/{ticketId}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deleted
 */
router.delete("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.ticketId);
    if (ticket) await ticket.destroy();
    res
      .status(ticket ? 200 : 404)
      .json(
        ticket ? { message: "Ticket deleted" } : { message: "Ticket not found" }
      );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/all:
 *   get:
 *     summary: Gets all tickets for a user
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tickets
 *       500:
 *         description: Internal Server Error
 */
router.get("/all", async (req, res) => {
  try {
    const userId = Array.isArray(req.query.userId)
      ? NaN
      : Number(req.query.userId);

    const tickets = await Ticket.findAll({ where: { userId: userId } });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/reserve:
 *   post:
 *     summary: Reserves a ticket for a user
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket reserved successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/reserve", async (req, res) => {
  try {
    const { ticketId, userId } = req.body;
    const ticket = await Ticket.findByPk(ticketId);

    ticket.userId = userId;
    ticket.status = "Reserved";
    await ticket.save();

    res
      .status(ticket ? 200 : 404)
      .json(ticket || { message: "Ticket not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/purchase:
 *   post:
 *     summary: Purchases a ticket for a user
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket purchased successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/purchase", async (req, res) => {
  try {
    const { ticketId, userId } = req.body;
    const ticket = await Ticket.findByPk(ticketId);

    ticket.userId = userId;
    ticket.status = "Sold";
    await ticket.save();
    res
      .status(ticket ? 200 : 404)
      .json(ticket || { message: "Ticket not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/cancel:
 *   post:
 *     summary: Cancels a ticket for a user
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket canceled successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/cancel", async (req, res) => {
  try {
    const { ticketId } = req.body;
    const ticket = await Ticket.findByPk(ticketId);

    ticket.userId = null;
    ticket.status = "Available";

    await ticket.save();
    res
      .status(ticket ? 200 : 404)
      .json(ticket || { message: "Ticket not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/availibility:
 *   get:
 *     summary: Gets the availability of tickets for a given event
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Number of available tickets
 *       500:
 *         description: Internal Server Error
 */
router.get("/availibility", async (req, res) => {
  try {
    const userId = Array.isArray(req.query.userId)
      ? NaN
      : Number(req.query.userId);

    const availableTickets = await Ticket.count({
      where: { eventId: userId, status: "Available" },
    });
    res.status(200).json({ availableTickets });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
