import express, { Request, Response } from "express";
import { User } from "../models/user"; // Assuming User model exists
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user info using token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user information.
 *       401:
 *         description: Unauthorized.
 */
router.get("/", async (req, res) => {
  let status = 200;
  let response;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    response = user || { message: "User not found" };
    status = user ? 200 : 404;
  } catch (error) {
    response = { error: error.message || "Internal Server Error" };
    status = status === 200 ? 500 : status;
  }
  res.status(status).json(response);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post("/register", async (req, res) => {
  let status = 201;
  let response;

  try {
    const { type, email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName || !type) {
      status = 400;
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      status = 409;
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      type,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    response = { message: "User registered successfully", userId: newUser.id };
  } catch (error) {
    response = { error: error.message || "Internal Server Error" };
    status = status === 201 ? 500 : status;
  }

  res.status(status).json(response);
});

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid input.
 */
router.put("/", async (req, res) => {
  let status = 200;
  let response;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      status = 404;
      throw new Error("User not found");
    }

    await user.update(req.body);
    response = { message: "User updated successfully" };
  } catch (error) {
    response = { error: error.message || "Internal Server Error" };
    status = status === 200 ? 500 : status;
  }

  res.status(status).json(response);
});

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete("/", async (req, res) => {
  let status = 200;
  let response;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      status = 404;
      throw new Error("User not found");
    }

    await user.destroy();
    response = { message: "User deleted successfully" };
  } catch (error) {
    response = { error: error.message || "Internal Server Error" };
    status = status === 200 ? 500 : status;
  }

  res.status(status).json(response);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", async (req, res) => {
  let status = 200;
  let response;

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      status = 400;
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      status = 401;
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    response = { message: "Login successful", token };
  } catch (error) {
    response = { error: error.message || "Internal Server Error" };
    status = status === 200 ? 500 : status;
  }

  res.status(status).json(response);
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logs out a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
router.post("/logout", async (req: Request, res: Response) => {
  try {
    // Logout logic (e.g., blacklist token)
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
