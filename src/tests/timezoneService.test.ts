import { TimezoneService } from "../services/timezoneService";

describe("TimezoneService", () => {
	it("should convert UTC to Asia/Jakarta correctly (string output)", () => {
		const dateStr = "2025-06-05T00:00:00Z";
		const result = TimezoneService.convert({
			fromTimezone: "UTC",
			toTimezone: "Asia/Jakarta",
			date: dateStr,
			outputFormat: "string",
		});

		// Jakarta is UTC+7, so expect 07:00:00 on the same day
		expect(result).toContain("07:00:00");
	});

	it('should return Date object when outputFormat is "date"', () => {
		const dateStr = "2025-06-05T10:00:00-04:00"; // NY time
		const result = TimezoneService.convert({
			fromTimezone: "America/New_York",
			toTimezone: "Europe/London",
			date: dateStr,
			outputFormat: "date",
		});

		expect(result).toBeInstanceOf(Date);
	});

	it("should use current date when no date is provided", () => {
		const result = TimezoneService.convert({
			fromTimezone: "UTC",
			toTimezone: "UTC",
			outputFormat: "string",
		});

		expect(typeof result).toBe("string");
	});
});
