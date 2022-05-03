const TimePickerUnits = Object.freeze({
  HOUR_24: {
    type: "HOUR_24",
    min: 0,
    max: 23,
  },
  HOUR_12: {
    type: "HOUR_12",
    min: 1,
    max: 12,
  },
  MINUTE: {
    type: "MINUTE",
    min: 0,
    max: 59,
  },
  SECOND: {
    type: "SECOND",
    min: 0,
    max: 59,
  },
});

const PeriodPickerOptions = Object.freeze({
  AM: "AM",
  PM: "PM",
});

const TimeFormat = Object.freeze({
  H12: "12",
  H24: "24",
});

export { TimePickerUnits, PeriodPickerOptions, TimeFormat };
