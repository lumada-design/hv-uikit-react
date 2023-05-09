import dayjs from "dayjs";

/**
 * Pads the unit time values so that they always have two digits
 * @param {Number} value - unit time value
 * @returns The unit time value with two digits
 */
export const padTime = (value) => {
  if (!value || value < 0) {
    return "00";
  }
  if (value < 10 && value.toString().length === 1) {
    return `0${value.toString()}`;
  }

  return value.toString();
};

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
