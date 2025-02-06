import express from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management API
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
 *         description: ID of the ticket
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *       404:
 *         description: Ticket not found
 */
router.get("/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findByPk(ticketId);
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - eventId
 *               - price
 *               - userId
 *             properties:
 *               type:
 *                 type: string
 *               eventId:
 *                 type: integer
 *               price:
 *                 type: number
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Ticket creation failed
 */
router.post("/", async (req, res) => {
  try {
    const { type, eventId, price, userId } = req.body;
    const ticket = await Ticket.create({ type, eventId, price, userId });
    res
      .status(ticket ? 201 : 400)
      .json(ticket || { message: "Ticket creation failed" });
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
 *         description: ID of the ticket to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       404:
 *         description: Ticket not found
 */
router.put("/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updateData = req.body;
    const ticket = await Ticket.findByPk(ticketId);
    if (ticket) {
      await ticket.update(updateData);
    }
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
 *         description: ID of the ticket to delete
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete("/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findByPk(ticketId);
    res
      .status(ticket ? 200 : 404)
      .json(
        ticket
          ? (await ticket.destroy(), { message: `Deleted ticket ${ticketId}` })
          : { message: "Ticket not found" }
      );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /tickets/user/{userId}:
 *   get:
 *     summary: Get all tickets for a user
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *       404:
 *         description: No tickets found for user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.findAll({ where: { userId } });
    res
      .status(tickets.length ? 200 : 404)
      .json(
        tickets.length ? tickets : { message: "No tickets found for user" }
      );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
