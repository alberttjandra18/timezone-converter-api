import { ConvertOptions } from "../types";
import moment from "moment-timezone";

export class TimezoneService {
	private static parseDate(date: Date | string): Date {
		return date instanceof Date ? date : new Date(date);
	}

	public static getList(): string[] {
		return moment.tz.names();
	}

	public static convert(options: ConvertOptions): string | Date {
		const {
			fromTimezone,
			toTimezone,
			date,
			outputFormat = "string",
			formatOptions = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
				timeZone: toTimezone,
			},
		} = options;

		const inputDate = date ? this.parseDate(date) : new Date();

		const formatterFrom = new Intl.DateTimeFormat("en-US", {
			...formatOptions,
			timeZone: fromTimezone,
		});

		const parts = formatterFrom.formatToParts(inputDate);
		const dateParts: Record<string, number> = {};
		parts.forEach(({ type, value }) => {
			if (type !== "literal") {
				dateParts[type] = Number(value);
			}
		});

		const { year, month, day, hour, minute, second } = dateParts;
		const utcDate = new Date(
			Date.UTC(year, month - 1, day, hour, minute, second)
		);

		if (outputFormat === "string") {
			const formatterTo = new Intl.DateTimeFormat("en-US", {
				...formatOptions,
				timeZone: toTimezone,
			});
			return formatterTo.format(utcDate);
		} else {
			return utcDate;
		}
	}
}
