import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToUTC = (date, tz) => {
  return dayjs.tz(date, tz).utc().format();
};

export function isNumericRange(value) {
  return value.from !== undefined && value.to !== undefined;
}

export function isDateTimeStrings(value) {
  return value.date !== undefined && value.time !== undefined;
}

export function isDateTimeRange(value) {
  return value.start !== undefined && value.end !== undefined;
}

export const parseDate = (date) => {
  if (date != null) {
    return dayjs(date).toDate();
  }

  return undefined;
};

export const parseTime = (time) => {
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
  startDate,
  startTime,
  endDate?,
  endTime?,
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
