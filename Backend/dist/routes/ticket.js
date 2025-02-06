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
const ticket_1 = require("../models/ticket");
const router = express_1.default.Router();
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
router.get("/:ticketId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const ticket = yield ticket_1.Ticket.findByPk(ticketId);
        res
            .status(ticket ? 200 : 404)
            .json(ticket || { message: "Ticket not found" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, eventId, price, userId } = req.body;
        const ticket = yield ticket_1.Ticket.create({ type, eventId, price, userId });
        res
            .status(ticket ? 201 : 400)
            .json(ticket || { message: "Ticket creation failed" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
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
router.put("/:ticketId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const updateData = req.body;
        const ticket = yield ticket_1.Ticket.findByPk(ticketId);
        if (ticket) {
            yield ticket.update(updateData);
        }
        res
            .status(ticket ? 200 : 404)
            .json(ticket || { message: "Ticket not found" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
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
router.delete("/:ticketId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const ticket = yield ticket_1.Ticket.findByPk(ticketId);
        res
            .status(ticket ? 200 : 404)
            .json(ticket
            ? (yield ticket.destroy(), { message: `Deleted ticket ${ticketId}` })
            : { message: "Ticket not found" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
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
router.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const tickets = yield ticket_1.Ticket.findAll({ where: { userId } });
        res
            .status(tickets.length ? 200 : 404)
            .json(tickets.length ? tickets : { message: "No tickets found for user" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
