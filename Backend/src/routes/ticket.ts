import express from "express";

const router = express.Router();

// Gets a ticket for a user using param in the URL
router.get("/", (req, res) => {});

// creates a new ticket
router.post("/", (req, res) => {});

// Updates user info using the passed token
router.put("/", (req, res) => {});

// Deletes user
router.delete("/", (req, res) => {});

// Gets all tickets for a user
router.get("/all", (req, res) => {});

// Reserves ticket for a user
router.post("/reserve", (req, res) => {});

//  Purchases ticket for a user
router.post("/purchase", (req, res) => {});

// Cancels ticket for a user
router.post("/cancel", (req, res) => {});

// Gets availibility of tickets for a given event
router.get("/availibility", (req, res) => {});

export default router;
