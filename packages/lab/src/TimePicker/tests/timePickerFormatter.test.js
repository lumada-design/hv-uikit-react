/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TimeFormat, PeriodPickerOptions } from "../enums";
import * as formatter from "../timePickerFormatter";

describe("timePickerFormatter", () => {
  it("padTime - should return 00 if value is undefined", () => {
    expect(formatter.padTime(undefined)).toBe("00");
    expect(formatter.padTime(null)).toBe("00");
  });
  it("padTime - should return 00 if value is smaller than 0", () => {
    expect(formatter.padTime(-1)).toBe("00");
  });
  it("padTime - should pad the passed value with one zero if value is one digit", () => {
    expect(formatter.padTime(1)).toBe("01");
  });
  it("padTime - should return the value if composed by more than one digit", () => {
    expect(formatter.padTime(10)).toBe(10);
  });
  it("getTimeFormatForLocale - should return 12h format if the locale uses a 12h format", () => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({
          hour12: true
        })
      })
    };
    expect(formatter.getTimeFormatForLocale("mockLocale")).toBe(TimeFormat.H12);
  });
  it("getTimeFormatForLocale - should return 24h format if the locale does not use a 12h format", () => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({
          hour12: false
        })
      })
    };
    expect(formatter.getTimeFormatForLocale("mockLocale")).toBe(TimeFormat.H24);
  });
  it("getFormattedTime - should return a string representing the passed time object", () => {
    const time = {
      hours: 1,
      minutes: 2,
      seconds: 3,
      period: PeriodPickerOptions.AM
    };
    expect(formatter.getFormattedTime(time)).toBe("01:02:03 AM");
    time.period = PeriodPickerOptions.PM;
    expect(formatter.getFormattedTime(time)).toBe("01:02:03 PM");
    time.period = undefined;
    expect(formatter.getFormattedTime(time)).toBe("01:02:03");
  });
});
