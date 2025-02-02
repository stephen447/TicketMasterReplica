import express from "express";

const router = express.Router();

// Get event details for event id
router.get("/", (req, res) => {});

// Creates a new event
router.post("/", (req, res) => {});

// Updates an event
router.put("/", (req, res) => {});

// Deletes an event
router.delete("/", (req, res) => {});

// Gets featured adverts
router.get("/featured", (req, res) => {});

// Gets popular events
router.get("/popular", (req, res) => {});

// Searches for events
router.get("/search", (req, res) => {});

export default router;
