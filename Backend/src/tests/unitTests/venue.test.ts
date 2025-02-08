import request from "supertest";
import { app, startServer } from "../../server"; // Import startServer function
import sequelize from "../../db";
import { Venue } from "../../models/venue"; // Import the Venue model

let server;

beforeAll(async () => {
  server = await startServer(3000); // Start the server on a specific port
});

afterAll(async () => {
  server.close(); // Close the server after the tests
  await sequelize.close(); // Optionally, close the sequelize connection
});

describe("Venue API", () => {
  let venueId: number;

  beforeEach(async () => {
    // Clear database before each test
    await Venue.destroy({ where: {} });

    // Create a sample venue for testing
    const venue = await Venue.create({
      name: "Test Venue",
      city: "Test City",
      capacity: 500,
      venueType: "Concert Hall",
      tickets: [
        { name: "Standard Ticket", price: 100, total: 1000 },
        { name: "VIP Ticket", price: 200, total: 200 },
      ],
    });

    venueId = venue.getDataValue("id"); // Extract ID safely
  });

  // GET /venues/:id - Fetch a venue by ID
  it("should fetch venue details", async () => {
    const res = await request(app).get(`/venues/${venueId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", venueId);
    expect(res.body).toHaveProperty("name", "Test Venue");
    expect(res.body).toHaveProperty("city", "Test City");
    expect(res.body).toHaveProperty("capacity", 500);
    expect(res.body).toHaveProperty("venueType", "Concert Hall");
    expect(res.body).toHaveProperty("tickets");
  });

  it("should return 404 for a non-existent venue", async () => {
    const res = await request(app).get(`/venues/9999`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Venue not found");
  });

  it("should create a new venue", async () => {
    const newVenue = {
      name: "New Venue",
      city: "New City",
      capacity: 800,
      venueType: "Stadium",
      tickets: [
        { name: "General Admission", price: 50, total: 5000 },
        { name: "VIP Admission", price: 150, total: 500 },
      ],
    };

    const res = await request(app).post("/venues").send(newVenue);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newVenue.name);
    expect(res.body.city).toBe(newVenue.city);
    expect(res.body.capacity).toBe(newVenue.capacity);
    expect(res.body.venueType).toBe(newVenue.venueType);
    expect(res.body.tickets.length).toBeGreaterThan(0);
  });

  it("should return 400 when missing required fields", async () => {
    const res = await request(app)
      .post("/venues")
      .send({ name: "Incomplete Venue" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Failed to create venue");
  });

  it("should update an existing venue", async () => {
    const updatedData = { name: "Updated Venue Name" };
    const res = await request(app).put(`/venues/${venueId}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
  });

  it("should return 404 when updating a non-existent venue", async () => {
    const res = await request(app)
      .put(`/venues/9999`)
      .send({ name: "Non-existent Venue" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Venue not found or no changes made");
  });

  it("should delete an existing venue", async () => {
    const res = await request(app).delete(`/venues/${venueId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Venue deleted successfully");

    const checkRes = await request(app).get(`/venues/${venueId}`);
    expect(checkRes.status).toBe(404);
  });

  it("should return 404 when deleting a non-existent venue", async () => {
    const res = await request(app).delete(`/venues/9999`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Venue not found");
  });
});
