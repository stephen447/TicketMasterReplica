import request from "supertest";
import { app, startServer } from "../../server"; // Import startServer function
import sequelize from "../../db";
import { Sequelize } from "sequelize";
import { Event } from "../../models/event"; // Import the Event model

let server;

beforeAll(async () => {
  server = await startServer(3000); // Start the server on a specific port
});

afterAll(async () => {
  server.close(); // Close the server after the tests
  await sequelize.close(); // Optionally, close the sequelize connection
});

describe("Event API", () => {
  let eventId: number;

  beforeEach(async () => {
    // Clear database before each test
    await Event.destroy({ where: {} });

    // Create a sample event for testing
    const event = await Event.create({
      title: "Test Event",
      description: "A test event description",
      venueId: 1,
      time: "18:00",
      city: "Test City",
      region: "Test Region",
      date: new Date("2023-12-31").toISOString(),
      tickets: JSON.stringify({ price: 100, available: 1000 }), // Ensure correct format
    });

    eventId = event.getDataValue("id"); // Extract ID safely
  });

  //  GET /events/:id - Fetch an event by ID
  it("should fetch event details", async () => {
    const res = await request(app).get(`/events/event/${eventId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", eventId);
  });

  it("should return 404 for a non-existent event", async () => {
    const res = await request(app).get(`/events/event/1`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  //  POST /events - Create an event
  it("should create a new event", async () => {
    const newEvent = {
      title: "New Event",
      description: "New event description",
      venueId: 2,
      time: "20:00",
      city: "New City",
      region: "New Region",
      date: "2024-06-15",
      tickets: { price: 50, available: 500 },
    };

    const res = await request(app).post("/events").send(newEvent);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newEvent.title);
  });

  it("should return 400 when missing required fields", async () => {
    const res = await request(app)
      .post("/events")
      .send({ title: "Incomplete Event" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Failed to create event");
  });

  //  PUT /events/:id - Update an event
  it("should update an existing event", async () => {
    const updatedData = { title: "Updated Event Title" };
    const res = await request(app).put(`/events/${eventId}`).send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedData.title);
  });

  it("should return 404 when updating a non-existent event", async () => {
    const res = await request(app)
      .put(`/events/9999`)
      .send({ title: "Non-existent Event" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  // DELETE /events/:id - Delete an event
  it("should delete an existing event", async () => {
    const res = await request(app).delete(`/events/${eventId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event deleted successfully");

    const checkRes = await request(app).get(`/events/event/${eventId}`);
    expect(checkRes.status).toBe(404);
  });

  it("should return 404 when deleting a non-existent event", async () => {
    const res = await request(app).delete(`/events/9999`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  // GET /events/search - Search for events
  it("should return matching events for a search query", async () => {
    const res = await request(app).get(`/events/search?query=1`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 400 when no query parameter is provided", async () => {
    const res = await request(app).get("/events/search");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Query parameter is required");
  });

  //  GET /events/featured (not implemented, placeholder)
  // it("should return 501 for the /featured endpoint (not implemented)", async () => {
  //   const res = await request(app).get("/events/featured");
  //   expect(res.status).toBe(500);
  // });

  //  GET /events/popular (not implemented, placeholder)
  // it("should return 501 for the /popular endpoint (not implemented)", async () => {
  //   const res = await request(app).get("/events/popular");
  //   expect(res.status).toBe(500);
  // });
});
