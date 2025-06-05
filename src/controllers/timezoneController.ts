import { Request, Response } from "express";
import { TimezoneService } from "../services/timezoneService";

export class TimezoneController {
	public static convertTimeZone(req: Request, res: Response): void {
		try {
			const { fromTimezone, toTimezone, date, outputFormat } = req.body;

			if (!fromTimezone || !toTimezone) {
				res
					.status(400)
					.json({ error: "fromTimezone and toTimezone are required." });
				return;
			}

			const result = TimezoneService.convert({
				fromTimezone,
				toTimezone,
				date,
				outputFormat,
			});

			res.json({ result });
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	}
}
