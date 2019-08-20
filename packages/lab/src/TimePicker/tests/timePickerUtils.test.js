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

import { TimePickerUnits, PeriodPickerOptions } from "../enums";
import * as utils from "../timePickerUtils";

const mockType = "MOCK_TYPE";
TimePickerUnits.MOCK_TYPE = {
  type: mockType,
  min: 0,
  max: 23
};

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
    expect(utils.isUnitTimeInValidRange(0, mockType)).toBe(true);
    expect(utils.isUnitTimeInValidRange(23, mockType)).toBe(true);
    expect(utils.isUnitTimeInValidRange(-1, mockType)).toBe(false);
    expect(utils.isUnitTimeInValidRange(24, mockType)).toBe(false);
  });
});
