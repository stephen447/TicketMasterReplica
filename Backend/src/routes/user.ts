import express, { Request, Response } from "express";
import { User } from "../models/user"; // User model
import bcrypt from "bcryptjs"; // Used for encrypting passwords
import jwt from "jsonwebtoken"; // Generating webtokens

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
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 *
 */
router.get("/", async (req, res) => {
  let status = 200;
  let response;

  try {
    // Get the token from the Authorization header cookies
    const token = req.cookies.token;
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    // Get the id from thw token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    // Find the user by id
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    // Update the response and status
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
 * /users/register:
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid input.
 *       409:
 *         description: User already exists.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/register", async (req, res) => {
  let status = 201;
  let response;

  try {
    // Get the user data from the request body
    const { type, email, password, firstName, lastName } = req.body;

    // Check if all fields are provided
    if (!email || !password || !firstName || !lastName || !type) {
      status = 400;
      throw new Error("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    // If the user exists, return an error
    if (existingUser) {
      status = 409;
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({
      type,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Update the response - maybe without the password?
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
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put("/", async (req, res) => {
  let status = 200;
  let response;

  try {
    // Get the token from the Authorization header
    const token = req.cookies.token;

    // If the token is not provided, return an error
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    // Decode the token to get the user id
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    // Find the user by id
    const user = await User.findByPk(decoded.id);

    // If the user is not found, return an error
    if (!user) {
      status = 404;
      throw new Error("User not found");
    }

    // Check if the user exists for the new email
    const existing = await User.findOne({ where: { email: req.body.email } });
    if (existing) {
      status = 400;
      throw new Error("Email already in use");
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
    // Get the token from the Authorization header
    const token = req.cookies.token;
    if (!token) {
      status = 401;
      throw new Error("Unauthorized");
    }

    // Decode the token to get the user id
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    // Find the user by id
    const user = await User.findByPk(decoded.id);

    // If the user is not found, return an error
    if (!user) {
      status = 404;
      throw new Error("User not found");
    }

    // Delete the user
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
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/login", async (req, res) => {
  let status = 200;
  let response;

  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      status = 400;
      throw new Error("Email and password are required");
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    // If the user doesnt exist or password doesnt match, return invalid credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      status = 401;
      throw new Error("Invalid credentials");
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Return the user data
    response = { message: "Login successful", user: user };
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
 *       500:
 *         description: Internal Server Error.
 */
router.post("/logout", async (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
