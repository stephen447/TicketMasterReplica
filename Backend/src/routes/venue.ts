import express, { Request, Response } from "express";
import { Venue } from "../models/venue";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: API for managing venues
 */

/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the venue
 *     responses:
 *       200:
 *         description: Venue details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Venue not found
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByPk(id);

    const response = venue
      ? { status: 200, data: venue }
      : { status: 404, data: { message: "Venue not found" } };

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /venues:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       201:
 *         description: Venue created
 *       400:
 *         description: Invalid request body
 */
router.post("/", async (req, res) => {
  try {
    const venue = await Venue.create(req.body);

    const response = venue
      ? { status: 201, data: venue }
      : { status: 400, data: { message: "Failed to create venue" } };

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /venues/{id}:
 *   put:
 *     summary: Update a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Venue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       200:
 *         description: Venue updated
 *       404:
 *         description: Venue not found
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Venue.update(req.body, { where: { id } });

    const response = updated
      ? { status: 200, data: { message: "Venue updated successfully" } }
      : {
          status: 404,
          data: { message: "Venue not found or no changes made" },
        };

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /venues/{id}:
 *   delete:
 *     summary: Delete a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Venue ID
 *     responses:
 *       204:
 *         description: Venue deleted
 *       404:
 *         description: Venue not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Venue.destroy({ where: { id } });

    const response = deleted
      ? { status: 200, data: { message: "Venue deleted successfully" } }
      : { status: 404, data: { message: "Venue not found" } };

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
