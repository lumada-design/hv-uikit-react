import CalendarModel from "../model";
import { NAV_OPTIONS } from "../enums";
import { getMonthDays, makeUTCToday } from "../utils";

let calendarModelInstance;

beforeEach(() => {
  calendarModelInstance = new CalendarModel(1, 2000);
});

describe("CalendarModel", () => {
  it("should create a calendar model object with the received month and year", () => {
    expect(calendarModelInstance.month).toBe(1);
    expect(calendarModelInstance.year).toBe(2000);
  });

  it("should create a calendar model object with today month and year when input parameters aren't supplied", () => {
    const today = makeUTCToday();
    calendarModelInstance = new CalendarModel();
    expect(calendarModelInstance.month).toBe(today.getUTCMonth() + 1);
    expect(calendarModelInstance.year).toBe(today.getUTCFullYear());
  });

  it("should create a `dates` property with 42 positions", () => {
    expect(calendarModelInstance.dates.length).toBe(42);
  });

  it("should have all the days of the month available in the dates array", () => {
    const currentDates = calendarModelInstance.dates.filter(
      date => date.getUTCMonth() + 1 === 1 && date.getUTCFullYear() === 2000
    );

    expect(currentDates.length).toBe(getMonthDays(1, 2000));
  });

  it("should change to the new month and year when invoking `updateModel()`", () => {
    calendarModelInstance.updateModel(14, 2020);

    expect(calendarModelInstance.month).toBe(14);
    expect(calendarModelInstance.year).toBe(2020);
  });
});
