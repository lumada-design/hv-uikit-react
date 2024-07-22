import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  HvQueryBuilderDateTimeRange,
  HvQueryBuilderDateTimeStrings,
  HvQueryBuilderNumericRange,
  HvQueryBuilderQueryRule,
} from "@hitachivantara/uikit-react-core";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToUTC = (date: string, tz: string) => {
  return dayjs.tz(date, tz).utc().format();
};

export function isNumericRange(
  value: HvQueryBuilderQueryRule["value"],
): value is HvQueryBuilderNumericRange {
  return (
    typeof value === "object" &&
    !Array.isArray(value) &&
    "from" in value &&
    "to" in value
  );
}

export function isDateTimeStrings(
  value: HvQueryBuilderQueryRule["value"],
): value is HvQueryBuilderDateTimeStrings {
  return (
    typeof value === "object" &&
    !Array.isArray(value) &&
    "date" in value &&
    "time" in value
  );
}

export function isDateTimeRange(
  value: HvQueryBuilderQueryRule["value"],
): value is HvQueryBuilderDateTimeRange {
  return (
    typeof value === "object" &&
    !Array.isArray(value) &&
    "start" in value &&
    "end" in value
  );
}

export const parseDate = (date?: string) => {
  if (date != null) {
    return dayjs(date).toDate();
  }

  return undefined;
};

export const parseTime = (time?: string) => {
  if (time != null) {
    const parts = time.split(":");

    if (parts.length === 3) {
      return {
        hours: Number.parseInt(parts[0], 10),
        minutes: Number.parseInt(parts[1], 10),
        seconds: Number.parseInt(parts[2], 10),
      };
    }
  }

  return null;
};

export const validateDateTimeValues = (
  startDate: string,
  startTime: string,
  endDate?: string,
  endTime?: string,
) => {
  if (parseDate(startDate) == null) {
    return false;
  }
  if (parseTime(startTime) == null) {
    return false;
  }

  if (endDate !== undefined || endTime !== undefined) {
    if (parseDate(endDate) == null) {
      return false;
    }
    if (parseTime(endTime) == null) {
      return false;
    }
    const endDateIsBefore =
      startDate != null && endDate != null && endDate < startDate;

    const endTimeIsBeforeOrSame =
      startDate != null &&
      endDate != null &&
      endDate === startDate &&
      startTime != null &&
      endTime != null &&
      endTime <= startTime;

    const endDateTimeIsBefore = endDateIsBefore || endTimeIsBeforeOrSame;

    return !endDateTimeIsBefore;
  }

  return true;
};

export default dayjs;
