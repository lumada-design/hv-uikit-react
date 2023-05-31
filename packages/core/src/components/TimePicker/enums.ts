export const TimePickerUnits = {
  HOUR_24: { min: 0, max: 23 },
  HOUR_12: { min: 1, max: 12 },
  MINUTE: { min: 0, max: 59 },
  SECOND: { min: 0, max: 59 },
} satisfies Record<string, { min: number; max: number }>;

export type TimeType = keyof typeof TimePickerUnits;

export type PeriodOptions = "AM" | "PM";

export type TimeFormat = "H12" | "H24";
