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

import CalendarModel from "../model";
import { NAV_OPTIONS } from "../enums";
import { getMonthDays } from "../utils";

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
    const today = new Date();
    calendarModelInstance = new CalendarModel();
    expect(calendarModelInstance.month).toBe(today.getMonth() + 1);
    expect(calendarModelInstance.year).toBe(today.getFullYear());
  });

  it("should create a `dates` property with 42 positions", () => {
    expect(calendarModelInstance.dates.length).toBe(42);
  });

  it("should navigate to the next month when invoking `navigateTo(NAV_OPTIONS.NEXT_MONTH)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_MONTH);

    expect(calendarModelInstance.month).toBe(2);
  });

  it("should navigate to the next year when invoking `navigateTo(NAV_OPTIONS.NEXT_YEAR)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_YEAR);

    expect(calendarModelInstance.year).toBe(2001);
  });

  it("should navigate to the previous month when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_MONTH)`", () => {
    calendarModelInstance = new CalendarModel(3, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.month).toBe(2);
  });

  it("should navigate to the previous year when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_YEAR)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.year).toBe(1999);
  });

  it("should navigate to the previous month and year when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_MONTH)` and the current month is 1", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.month).toBe(12);
    expect(calendarModelInstance.year).toBe(1999);
  });

  it("should navigate to the next month and year when invoking `navigateTo(NAV_OPTIONS.NEXT_MONTH)` and the current month is 12", () => {
    calendarModelInstance = new CalendarModel(12, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_MONTH);

    expect(calendarModelInstance.month).toBe(1);
    expect(calendarModelInstance.year).toBe(2001);
  });

  it("should navigate to the specified month when invoking `navigateTo(NAV_OPTIONS.MONTH, MONTH)`", () => {
    calendarModelInstance = new CalendarModel(12, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.MONTH, 3);

    expect(calendarModelInstance.month).toBe(3);
    expect(calendarModelInstance.year).toBe(2000);
  });

  it("should have all the days of the month available in the dates array", () => {
    const currentDates = calendarModelInstance.dates.filter(
      date => date.getMonth() + 1 === 1 && date.getFullYear() === 2000
    );

    expect(currentDates.length).toBe(getMonthDays(1, 2000));
  });

  it("should change to the new month and year when invoking `updateModel()`", () => {
    calendarModelInstance.updateModel(14, 2020);

    expect(calendarModelInstance.month).toBe(14);
    expect(calendarModelInstance.year).toBe(2020);
  });
});
