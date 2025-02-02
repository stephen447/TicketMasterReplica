import express from "express";

const router = express.Router();

// Gets a user info using the passed token
router.get("/", (req, res) => {});

// Registers a new user

// Updates user info using the passed token
router.put("/", (req, res) => {});

// Deletes user
router.delete("/", (req, res) => {});

// Logs in a user
router.post("/login", (req, res) => {});

// logs out a user
router.post("/logout", (req, res) => {});

export default router;
