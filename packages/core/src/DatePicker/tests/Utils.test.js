import { moveDate } from "../utils";

describe("moveDate function", () => {
  it("next month increments month", () => {
    const expectedDate = {
      newMonth: 3,
      newYear: 2020,
    };

    expect(moveDate("next_month", 2020, 2)).toMatchObject(expectedDate);
  });

  it("previous month decrements month", () => {
    const expectedDate = {
      newMonth: 3,
      newYear: 2020,
    };
    expect(moveDate("previous_month", 2020, 4)).toMatchObject(expectedDate);
  });

  it("increments year when month is december on next month", () => {
    const expectedDate = {
      newMonth: 1,
      newYear: 2021,
    };
    expect(moveDate("next_month", 2020, 12)).toMatchObject(expectedDate);
  });

  it("decrements year when month is december on previous month", () => {
    const expectedDate = {
      newMonth: 12,
      newYear: 2020,
    };
    expect(moveDate("previous_month", 2021, 1)).toMatchObject(expectedDate);
  });

  it("increments year", () => {
    const expectedDate = {
      newMonth: 1,
      newYear: 2023,
    };
    expect(moveDate("next_year", 2022, 1)).toMatchObject(expectedDate);
  });

  it("decrements year", () => {
    const expectedDate = {
      newMonth: 1,
      newYear: 2020,
    };
    expect(moveDate("previous_year", 2021, 1)).toMatchObject(expectedDate);
  });
});
