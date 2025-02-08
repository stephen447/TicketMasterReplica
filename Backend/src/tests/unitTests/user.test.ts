import request from "supertest";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { app, startServer } from "../../server"; // Import startServer function
import sequelize from "../../db";

// Mock the Event model
jest.mock("../../models/event");

let server;

beforeAll(async () => {
  server = await startServer(3000); // Start the server on a specific port
});

afterAll(async () => {
  server.close(); // Close the server after the tests
  await sequelize.close(); // Optionally, close the sequelize connection
});

jest.mock("../../models/user");

const mockUser = {
  id: 1,
  type: "admin",
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
  password: bcrypt.hashSync("password123", 10),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe("User Routes", () => {
  let token;

  beforeAll(() => {
    token = jwt.sign(
      { id: mockUser.id },
      process.env.JWT_SECRET || "test_secret",
      { expiresIn: "1h" }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /** GET /users - Retrieve user info */
  test("GET /users - should return user info", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(mockUser.email);
  });

  test("GET /users - should return 401 if no token is provided", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
  });

  /** POST /users/register - Register a new user */
  test("POST /users/register - should register a new user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/users/register").send({
      type: "admin",
      email: "newuser@example.com",
      password: "password123",
      firstName: "New",
      lastName: "User",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("POST /users/register - should return 409 if user already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/users/register").send({
      type: "admin",
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("User already exists");
  });

  /** POST /users/login - Login */
  //   test("POST /users/login - should log in a user", async () => {
  //     (User.findOne as jest.Mock).mockResolvedValue(mockUser);
  //     jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

  //     const res = await request(app).post("/users/login").send({
  //       email: "test@example.com",
  //       password: "password123",
  //     });

  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("Login successful");
  //     expect(res.body.token).toBeDefined();
  //   });

  test("POST /users/login - should return 401 if credentials are invalid", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/users/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid credentials");
  });

  /** PUT /users - Update user */
  test("PUT /users - should update user info", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app)
      .put("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Updated" });

    expect(res.status).toBe(200);
    expect(mockUser.update).toHaveBeenCalledWith({ firstName: "Updated" });
  });

  test("PUT /users - should return 401 if no token is provided", async () => {
    const res = await request(app).put("/users").send({ firstName: "Updated" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
  });

  test("PUT /users - should return 404 if user is not found", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Updated" });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  /** DELETE /users - Delete user */
  test("DELETE /users - should delete user", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app)
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
    expect(mockUser.destroy).toHaveBeenCalled();
  });

  test("DELETE /users - should return 401 if no token is provided", async () => {
    const res = await request(app).delete("/users");

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
  });

  test("DELETE /users - should return 404 if user is not found", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  /** POST /users/logout - Logout */
  test("POST /users/logout - should log out user", async () => {
    const res = await request(app).post("/users/logout");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User logged out");
  });
});
