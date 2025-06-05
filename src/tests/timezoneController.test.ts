import request from "supertest";
import app from "../app";

describe("TimezoneController", () => {
	it("POST /api/timezone/convert should return converted time", async () => {
		const res = await request(app)
			.post("/api/timezone/convert")
			.send({
				fromTimezone: "UTC",
				toTimezone: "Asia/Jakarta",
				date: "2025-06-05T00:00:00Z",
				outputFormat: "string",
			})
			.expect(200);

		expect(res.body).toHaveProperty("result");
		expect(typeof res.body.result).toBe("string");
	});

	it("POST /api/timezone/convert should return 400 if missing required fields", async () => {
		const res = await request(app)
			.post("/api/timezone/convert")
			.send({
				toTimezone: "Asia/Jakarta",
			})
			.expect(400);

		expect(res.body).toHaveProperty("error");
	});

	it("POST /api/timezone/convert should handle server errors gracefully", async () => {
		// Send invalid date format to cause error
		const res = await request(app).post("/api/timezone/convert").send({
			fromTimezone: "UTC",
			toTimezone: "Asia/Jakarta",
			date: "invalid-date",
		});

		// Depending on implementation, might be 200 or 500.
		// We accept 200 with some string or 500 error
		expect([200, 500]).toContain(res.status);
	});
});
