import { TimePickerUnits, PeriodPickerOptions } from "../enums";
import * as utils from "../timePickerUtils";

describe("timePickerUtils", () => {
  it("getPeriodForDate - should return AM if hours are less than 12", () => {
    const date = new Date();
    date.setHours(1);
    expect(utils.getPeriodForDate(date)).toBe(PeriodPickerOptions.AM);
    date.setHours(11);
    expect(utils.getPeriodForDate(date)).toBe(PeriodPickerOptions.AM);
  });
  it("getPeriodForDate - should return PM if hours are equal or more than 12", () => {
    const date = new Date();
    date.setHours(12);
    expect(utils.getPeriodForDate(date)).toBe(PeriodPickerOptions.PM);
    date.setHours(13);
    expect(utils.getPeriodForDate(date)).toBe(PeriodPickerOptions.PM);
  });
  it("isUnitTimeInValidRange - should return true if value is between min and max for a given type", () => {
    expect(utils.isUnitTimeInValidRange(0, TimePickerUnits.HOUR_24.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(23, TimePickerUnits.HOUR_24.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(-1, TimePickerUnits.HOUR_24.type)).toBe(false);
    expect(utils.isUnitTimeInValidRange(24, TimePickerUnits.HOUR_24.type)).toBe(false);

    expect(utils.isUnitTimeInValidRange(1, TimePickerUnits.HOUR_12.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(12, TimePickerUnits.HOUR_12.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(0, TimePickerUnits.HOUR_12.type)).toBe(false);
    expect(utils.isUnitTimeInValidRange(13, TimePickerUnits.HOUR_12.type)).toBe(false);

    expect(utils.isUnitTimeInValidRange(0, TimePickerUnits.MINUTE.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(59, TimePickerUnits.MINUTE.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(-1, TimePickerUnits.MINUTE.type)).toBe(false);
    expect(utils.isUnitTimeInValidRange(60, TimePickerUnits.MINUTE.type)).toBe(false);

    expect(utils.isUnitTimeInValidRange(0, TimePickerUnits.SECOND.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(59, TimePickerUnits.SECOND.type)).toBe(true);
    expect(utils.isUnitTimeInValidRange(-1, TimePickerUnits.SECOND.type)).toBe(false);
    expect(utils.isUnitTimeInValidRange(60, TimePickerUnits.SECOND.type)).toBe(false);
  });
});
