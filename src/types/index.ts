export type Timezone = string;

export interface ConvertOptions {
	fromTimezone: Timezone;
	toTimezone: Timezone;
	date?: Date | string;
	outputFormat?: "string" | "date";
	formatOptions?: Intl.DateTimeFormatOptions;
}

export interface ConvertRequestBody {
	fromTimezone: Timezone;
	toTimezone: Timezone;
	date?: string;
	outputFormat?: "string" | "date";
}
