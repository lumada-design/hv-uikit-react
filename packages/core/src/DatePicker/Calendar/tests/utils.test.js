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

import {
  convertISOStringDateToDate,
  createDatesArray,
  getDateISO,
  getFormattedDate,
  getMonthDays,
  getMonthFirstDay,
  getMonthName,
  getMonthNamesList,
  getNextMonth,
  getPreviousMonth,
  getWeekdayNamesList,
  getWeekdayNumber,
  isDate,
  isDateInValidRange,
  isNextDateValid,
  isPreviousDateValid,
  isSameDay,
  isSameMonth,
  isValidLocale,
  makeUTCDate,
  makeUTCToday,
  UTCToLocalDate,
  zeroPad
} from "../utils";

describe("Calendar utils - zeroPad", () => {
  it("should return 01 when the input is 1 and the length is 2", () => {
    expect(zeroPad(1, 2)).toBe("01");
  });

  it("should return 3 when the input is 3 and the length is 0", () => {
    expect(zeroPad(3, 0)).toBe("3");
  });

  it("should return 005 when the input is 5 and the length is 3", () => {
    expect(zeroPad(5, 3)).toBe("005");
  });
});

describe("Calendar utils - getMonthDays", () => {
  it("should return 31 days for January", () => {
    expect(getMonthDays(1, 2000)).toBe(31);
  });

  it("should return 28 days for February for non leap year", () => {
    expect(getMonthDays(2, 1999)).toBe(28);
  });

  it("should return 29 days for February for leap year", () => {
    expect(getMonthDays(2, 2000)).toBe(29);
  });

  it("should return 31 days for March", () => {
    expect(getMonthDays(3, 2000)).toBe(31);
  });

  it("should return 30 days for April", () => {
    expect(getMonthDays(4, 2000)).toBe(30);
  });
});

describe("Calendar utils - getWeekdayNumber", () => {
  it("should return 0 when the date is referring to a Sunday", () => {
    const sunday = convertISOStringDateToDate("2009-02-01");
    expect(getWeekdayNumber(sunday)).toBe(0);
  });
  it("should return 1 when the date is referring to a Monday", () => {
    const monday = convertISOStringDateToDate("2009-02-02");
    expect(getWeekdayNumber(monday)).toBe(1);
  });
  it("should return 2 when the date is referring to a Tuesday", () => {
    const tuesday = convertISOStringDateToDate("2009-02-03");
    expect(getWeekdayNumber(tuesday)).toBe(2);
  });
  it("should return 3 when the date is referring to a Wednesday", () => {
    const wednesday = convertISOStringDateToDate("2009-02-04");
    expect(getWeekdayNumber(wednesday)).toBe(3);
  });
  it("should return 4 when the date is referring to a Thursday", () => {
    const thursday = convertISOStringDateToDate("2009-02-05");
    expect(getWeekdayNumber(thursday)).toBe(4);
  });
  it("should return 5 when the date is referring to a Friday", () => {
    const friday = convertISOStringDateToDate("2009-02-06");
    expect(getWeekdayNumber(friday)).toBe(5);
  });
  it("should return 6 when the date is referring to a Saturday", () => {
    const saturday = convertISOStringDateToDate("2009-02-07");
    expect(getWeekdayNumber(saturday)).toBe(6);
  });
});

describe("Calendar utils - makeUTCDate", () => {
  it("should create a date object in UTC timezone", () => {
    const date = makeUTCDate(2009, 2, 1);
    expect(date.getUTCFullYear()).toEqual(2009);
    expect(date.getUTCMonth() + 1).toEqual(2);
    expect(date.getUTCDate()).toEqual(1);
  });
});

describe("Calendar utils - makeUTCToday", () => {
  it("should create a date object with today's date in UTC timezone", () => {
    const todayUTC = makeUTCToday();
    const today = new Date();

    expect(todayUTC.getUTCFullYear()).toEqual(today.getFullYear());
    expect(todayUTC.getUTCMonth()).toEqual(today.getMonth());
    expect(todayUTC.getUTCDate()).toEqual(today.getDate());
  });
});

describe("Calendar utils - UTCToLocalDate", () => {
  it("should change a date object in UTC timezone to local timezone", () => {
    const dateUTC = makeUTCDate(2009, 2, 1);
    const date = new Date(2009, 1, 1);

    expect(UTCToLocalDate(dateUTC)).toEqual(date);
  });
});

describe("Calendar utils - getMonthFirstDay", () => {
  it("should return 0 when the first day of the month is a Sunday", () => {
    expect(getMonthFirstDay(2, 2009)).toBe(0);
  });
  it("should return 1 when the first day of the month is a Monday", () => {
    expect(getMonthFirstDay(6, 2009)).toBe(1);
  });
});

describe("Calendar utils - isDate", () => {
  it("should return `true` if the value received is a valid date", () => {
    expect(isDate(convertISOStringDateToDate("2019-01-01"))).toBe(true);
    expect(isDate(new Date(2019, 0, 1))).toBe(true);
    expect(isDate(new Date())).toBe(true);
  });
  it("should return `false` if the value received is a valid date", () => {
    expect(isDate("THIS IS NOT A DATE")).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(6)).toBe(false);
  });
});

describe("Calendar utils - isDateInValidRange", () => {
  it("should return `true` if the date is 2019-01-01", () => {
    expect(isDateInValidRange(convertISOStringDateToDate("2019-01-01"))).toBe(
      true
    );
  });
  it("should return `false` if the value received is 0999-01-01", () => {
    expect(isDateInValidRange(convertISOStringDateToDate("0999-01-01"))).toBe(
      false
    );
  });
  it("should return `false` if the value received is 10999-01-01", () => {
    expect(isDateInValidRange(convertISOStringDateToDate("10999-01-01"))).toBe(
      false
    );
  });
});

describe("Calendar utils - isSameMonth", () => {
  it("should return `true` if the received dates are in the same month and year", () => {
    expect(
      isSameMonth(
        convertISOStringDateToDate("2019-01-01"),
        convertISOStringDateToDate("2019-01-31")
      )
    ).toBe(true);
  });
  it("should return `false` if the received dates are not in the same month and year", () => {
    expect(
      isSameMonth(
        convertISOStringDateToDate("2019-01-01"),
        convertISOStringDateToDate("2019-02-31")
      )
    ).toBe(false);
  });
  it("should return `false` if one of the dates is invalid", () => {
    expect(
      isSameMonth(convertISOStringDateToDate("2019-01-01"), undefined)
    ).toBe(false);
  });
});

describe("Calendar utils - isSameDay", () => {
  it("should return `true` if the received dates are in the same day, month and year", () => {
    expect(
      isSameDay(
        convertISOStringDateToDate("2019-01-01"),
        convertISOStringDateToDate("2019-01-01")
      )
    ).toBe(true);
  });
  it("should return `false` if the received dates are not in the same day, month and year", () => {
    expect(
      isSameDay(
        convertISOStringDateToDate("2019-01-01"),
        convertISOStringDateToDate("2019-01-31")
      )
    ).toBe(false);
  });
  it("should return `false` if one of the dates is invalid", () => {
    expect(isSameDay(convertISOStringDateToDate("2019-01-01"), undefined)).toBe(
      false
    );
  });
});

describe("Calendar utils - getDateISO", () => {
  it("should return the received date in ISO format (YYYY-MM-DD)", () => {
    expect(getDateISO(new Date(2019, 0, 1))).toBe("2019-01-01");
  });
  it("should return `null` if the received date is invalid", () => {
    expect(getDateISO(undefined)).toBe(null);
  });
});

describe("Calendar utils - convertISOStringDateToDate", () => {
  it("should return the received ISO string date (YYYY-MM-DD) into the correct new Date object", () => {
    expect(convertISOStringDateToDate("2019-02-01").toISOString()).toEqual(
      "2019-02-01T00:00:00.000Z"
    );
  });
});

describe("Calendar utils - getPreviousMonth", () => {
  it("should return the previous month and the same year when the month between 2 and 12", () => {
    for (let iMonth = 2; iMonth <= 12; iMonth += 1) {
      expect(getPreviousMonth(iMonth, 2000)).toEqual({
        month: iMonth - 1,
        year: 2000
      });
    }
  });
  it("should return month 12 and the previous year when the month is 1", () => {
    expect(getPreviousMonth(1, 2000)).toEqual({
      month: 12,
      year: 1999
    });
  });
});

describe("Calendar utils - getNextMonth", () => {
  it("should return the next month and the same year when the month between 1 and 11", () => {
    for (let iMonth = 1; iMonth <= 11; iMonth += 1) {
      expect(getNextMonth(iMonth, 2000)).toEqual({
        month: iMonth + 1,
        year: 2000
      });
    }
  });
  it("should return month 1 and the next year when the month is 12", () => {
    expect(getNextMonth(12, 2000)).toEqual({
      month: 1,
      year: 2001
    });
  });
});

describe("Calendar utils - getMonthNamesList", () => {
  it("should return an array with 12 positions", () => {
    expect(getMonthNamesList("en-US").length).toBe(12);
  });
});

describe("Calendar utils - getWeekdayNamesList", () => {
  it("should return an array with 7 positions", () => {
    expect(getWeekdayNamesList("en-US").length).toBe(7);
  });
});

describe("Calendar utils - getMonthName", () => {
  it("should return a string", () => {
    expect(typeof getMonthName(1, "en-US")).toBe("string");
  });
});

describe("Calendar utils - getFormattedDate", () => {
  it("should return a date as a string with the format `14 Aug, 2019`", () => {
    expect(
      getFormattedDate(convertISOStringDateToDate("2019-08-14"), "en-US")
    ).toBe("14 Aug 2019");
  });
});

describe("Calendar utils - createDatesArray", () => {
  it("should return an array with 42 positions", () => {
    expect(createDatesArray(1, 2000).length).toBe(42);
  });

  it("should have in the array the correct amount of days for the specified month", () => {
    const year = 2000;
    let datesArray;

    for (let iMonth = 1; iMonth <= 12; iMonth += 1) {
      datesArray = createDatesArray(iMonth, year);
      const currentMonthDates = datesArray.filter(
        date =>
          date.getUTCMonth() + 1 === iMonth && date.getUTCFullYear() === year
      );
      const monthDays = getMonthDays(iMonth, year);

      expect(currentMonthDates.length).toBe(monthDays);
    }
  });

  it("should have in the array the same number of days from the previous month as the `getMonthFirstDay` function", () => {
    const datesArray = createDatesArray(1, 2000);
    const previousMonthDays = getMonthFirstDay(1, 2000);

    const previousMonthDates = datesArray.filter(
      date => date.getUTCMonth() + 1 === 12 && date.getUTCFullYear() === 1999
    );
    expect(previousMonthDates.length).toBe(previousMonthDays);
  });

  it("should have the sum of days from the previous month + current month + next month equal to 42", () => {
    const datesArray = createDatesArray(1, 2000);

    const previousMonthDates = datesArray.filter(
      date => date.getUTCMonth() + 1 === 12 && date.getUTCFullYear() === 1999
    );
    const currentMonthDates = datesArray.filter(
      date => date.getUTCMonth() + 1 === 1 && date.getUTCFullYear() === 2000
    );
    const nextMonthDates = datesArray.filter(
      date => date.getUTCMonth() + 1 === 2 && date.getUTCFullYear() === 2000
    );

    const totalAmountOfDates =
      previousMonthDates.length +
      currentMonthDates.length +
      nextMonthDates.length;
    expect(totalAmountOfDates).toBe(42);
  });
});

describe("Calendar utils - isValidLocale", () => {
  it("should return true for American locale `en-US`", () => {
    expect(isValidLocale("en-US")).toBe(true);
  });
  it("should return false for a locale with the incorrect format `something wrong`", () => {
    expect(isValidLocale("something wrong")).toBe(false);
  });
});

describe("Calendar utils - isPreviousDateValid", () => {
  it("should return true for year: 2019 and month: 1", () => {
    expect(isPreviousDateValid(2019, 1)).toBe(true);
  });
  it("should return false for year: 1000 and month: 1", () => {
    expect(isPreviousDateValid(1000, 1)).toBe(false);
  });
  it("should return true for year: 1000 and month: 2", () => {
    expect(isPreviousDateValid(1000, 2)).toBe(true);
  });
  it("should return true for year: 2000 and month: 1", () => {
    expect(isPreviousDateValid(2000, 1)).toBe(true);
  });
});

describe("Calendar utils - isNextDateValid", () => {
  it("should return true for year: 2019 and month: 1", () => {
    expect(isNextDateValid(2019, 1)).toBe(true);
  });
  it("should return true for year: 9999 and month: 1", () => {
    expect(isNextDateValid(9999, 1)).toBe(true);
  });
  it("should return true for year: 9999 and month: 5", () => {
    expect(isNextDateValid(9999, 5)).toBe(true);
  });
  it("should return false for year: 9999 and month: 12", () => {
    expect(isNextDateValid(9999, 12)).toBe(false);
  });
});
