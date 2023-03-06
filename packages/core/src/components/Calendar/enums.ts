import { VisibilitySelectorActions } from "./Calendar";

/**
 * View modes for the calendar component.
 */
export const VIEW_MODE = {
  CALENDAR: "calendar",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

/**
 * Option values that can be used with Intl to represent a part or multiple parts of a date.
 */
export const REPRESENTATION_VALUES: {
  LONG: RepresentationValuesType;
  SHORT: RepresentationValuesType;
  NARROW: RepresentationValuesType;
  NUMERIC: RepresentationValuesType;
  TWO_DIGIT: RepresentationValuesType;
} = {
  LONG: "long",
  SHORT: "short",
  NARROW: "narrow",
  NUMERIC: "numeric",
  TWO_DIGIT: "2-digit",
};

export type RepresentationValuesType =
  | "long"
  | "short"
  | "narrow"
  | "numeric"
  | "2-digit";

export type DateTimeFormatOptions = "long" | "short" | "narrow";

export const DATETIMEFORMAT_OPTIONS: {
  LONG: DateTimeFormatOptions;
  SHORT: DateTimeFormatOptions;
  NARROW: DateTimeFormatOptions;
} = {
  LONG: "long",
  SHORT: "short",
  NARROW: "narrow",
};
/**
 * Navigation options for the calendar component.
 */
export const NAV_OPTIONS: {
  PREVIOUS_MONTH: VisibilitySelectorActions;
  PREVIOUS_YEAR: VisibilitySelectorActions;
  NEXT_MONTH: VisibilitySelectorActions;
  NEXT_YEAR: VisibilitySelectorActions;
  MONTH: VisibilitySelectorActions;
  MONTH_YEAR: VisibilitySelectorActions;
} = {
  PREVIOUS_MONTH: "previous_month",
  PREVIOUS_YEAR: "previous_year",
  NEXT_MONTH: "next_month",
  NEXT_YEAR: "next_year",
  MONTH: "month",
  MONTH_YEAR: "month_year",
};
