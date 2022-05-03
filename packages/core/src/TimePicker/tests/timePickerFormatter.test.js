import { TimeFormat, PeriodPickerOptions } from "../enums";
import * as formatter from "../timePickerFormatter";

describe("timePickerFormatter", () => {
  it("padTime - should return undefined if value is null/undefined", () => {
    expect(formatter.padTime(undefined)).toBe(undefined);
    expect(formatter.padTime(null)).toBe(undefined);
  });
  it("padTime - should return the original value if value is smaller than 0", () => {
    expect(formatter.padTime(-1)).toBe("-1");
  });
  it("padTime - should pad the passed value with one zero if value is one digit", () => {
    expect(formatter.padTime(1)).toBe("01");
  });
  it("padTime - should return the value if composed by more than one digit", () => {
    expect(formatter.padTime(10)).toBe("10");
  });
  it("getTimeFormatForLocale - should return 12h format if the locale uses a 12h format", () => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({
          hour12: true,
        }),
      }),
    };
    expect(formatter.getTimeFormatForLocale("mockLocale")).toBe(TimeFormat.H12);
  });
  it("getTimeFormatForLocale - should return 24h format if the locale does not use a 12h format", () => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({
          hour12: false,
        }),
      }),
    };
    expect(formatter.getTimeFormatForLocale("mockLocale")).toBe(TimeFormat.H24);
  });
  it("getFormattedTime - should return a string representing the passed time object", () => {
    const time = {
      hours: 1,
      minutes: 2,
      seconds: 3,
      period: PeriodPickerOptions.AM,
    };
    expect(formatter.getFormattedTime(time)).toBe("01:02:03 AM");
    time.period = PeriodPickerOptions.PM;
    expect(formatter.getFormattedTime(time)).toBe("01:02:03 PM");
    time.period = undefined;
    expect(formatter.getFormattedTime(time)).toBe("01:02:03");
  });
});
