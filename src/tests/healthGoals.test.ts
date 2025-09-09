import request from "supertest";
import app from "../app";

describe("Health Goals API", () => {
    let goalId: string;

    // CREATE
    it("should create a new health goal", async () => {
        const { body: { data }, status } = await request(app)
            .post("/health-goals")
            .send({
                "userId": "12345",
                "title": "Run 5km daily",
                "description": "Morning run to improve stamina",
                "targetDate": "2025-09-30",
                "status": "pending"
            });

        expect(status).toBe(201);
        expect(data).toHaveProperty("id");
        expect(data.title).toBe("Run 5km daily");

        goalId = data.id;
    });

    // READ ALL
    it("should list all health goals", async () => {
        const { body: { data }, status } = await request(app).get("/health-goals");
        expect(status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    // READ ONE
    it("should fetch a health goal by id", async () => {
        const { body: { data }, status } = await request(app).get(`/health-goals/${goalId}`);
        expect(status).toBe(200);
        expect(data.id).toBe(goalId);
    });

    // UPDATE
    it("should update a health goal", async () => {
        const { body: { data }, status } = await request(app)
            .put(`/health-goals/${goalId}`)
            .send({ title: "Run 10km", target: "weekly" });

        expect(status).toBe(200);
        expect(data.title).toBe("Run 10km");
    });

    // DELETE
    it("should delete a health goal", async () => {
        const { status } = await request(app).delete(`/health-goals/${goalId}`);
        expect(status).toBe(204);
    });

    // NOT FOUND
    it("should return 404 for non-existing id", async () => {
        const { status } = await request(app).get("/health-goals/unknown-id");
        expect(status).toBe(404);
    });
});
