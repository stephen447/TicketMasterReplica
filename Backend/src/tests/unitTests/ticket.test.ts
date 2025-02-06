import request from "supertest";
import { app, startServer } from "../../server"; // Import startServer function
import sequelize from "../../db";
import { Sequelize } from "sequelize";
import { Event } from "../../models/event"; // Import the Event model

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

describe("GET /events/:id", () => {
  it("should return event details when event exists", async () => {
    const mockEvent = {
      id: "1",
      title: "Test Event",
      date: "2025-02-05T00:00:00Z",
      location: "Test Location",
    };
    (Event.findByPk as jest.Mock).mockResolvedValue(mockEvent);

    const res = await request(app).get("/events/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEvent);
  });

  it("should return 404 when event does not exist", async () => {
    (Event.findByPk as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/events/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Event not found" });
  });
});

describe("POST /events", () => {
  it("should create a new event", async () => {
    const newEvent = {
      title: "New Event",
      date: "2025-02-05T00:00:00Z",
      location: "New Location",
    };
    (Event.create as jest.Mock).mockResolvedValue(newEvent);

    const res = await request(app).post("/events").send(newEvent);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newEvent);
  });

  it("should return 400 if event creation fails", async () => {
    const newEvent = {
      title: "New Event",
      date: "2025-02-05T00:00:00Z",
      location: "New Location",
    };
    (Event.create as jest.Mock).mockRejectedValue(
      new Error("Failed to create")
    );

    const res = await request(app).post("/events").send(newEvent);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Failed to create event" });
  });
});

describe("PUT /events/:id", () => {
  it("should update an existing event", async () => {
    const updatedEvent = {
      title: "Updated Event",
      date: "2025-02-05T00:00:00Z",
      location: "Updated Location",
    };
    (Event.update as jest.Mock).mockResolvedValue([1, [updatedEvent]]);

    const res = await request(app).put("/events/1").send(updatedEvent);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedEvent);
  });

  it("should return 404 when event not found", async () => {
    (Event.update as jest.Mock).mockResolvedValue([0, []]);

    const res = await request(app)
      .put("/events/999")
      .send({ title: "Non-existent Event" });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Event not found" });
  });
});

describe("DELETE /events/:id", () => {
  it("should delete an event", async () => {
    (Event.destroy as jest.Mock).mockResolvedValue(1);

    const res = await request(app).delete("/events/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Event deleted successfully" });
  });

  it("should return 404 if event does not exist", async () => {
    (Event.destroy as jest.Mock).mockResolvedValue(0);

    const res = await request(app).delete("/events/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Event not found" });
  });
});
