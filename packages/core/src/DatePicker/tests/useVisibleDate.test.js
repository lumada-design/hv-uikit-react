import { renderHook, act } from "@testing-library/react-hooks";

import useVisibleDate from "../useVisibleDate";
import { NAV_OPTIONS } from "../../Calendar/enums";
import { makeUTCDate } from "../../Calendar/utils";

describe("moveDate function", () => {
  it("next month increments month", () => {
    // 2021-09-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 8, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.NEXT_MONTH,
      });
    });

    const expected = {
      visibleYear: 2021,
      visibleMonth: 10,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });

  it("previous month decrements month", () => {
    // 2021-09-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 8, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.PREVIOUS_MONTH,
      });
    });

    const expected = {
      visibleYear: 2021,
      visibleMonth: 8,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });

  it("increments year when month is december on next month", () => {
    // 2021-12-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 11, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.NEXT_MONTH,
      });
    });

    const expected = {
      visibleYear: 2022,
      visibleMonth: 1,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });

  it("decrements year when month is december on previous month", () => {
    // 2021-01-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 0, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.PREVIOUS_MONTH,
      });
    });

    const expected = {
      visibleYear: 2020,
      visibleMonth: 12,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });

  it("increments year", () => {
    // 2021-09-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 8, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.NEXT_YEAR,
      });
    });

    const expected = {
      visibleYear: 2022,
      visibleMonth: 9,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });

  it("decrements year", () => {
    // 2021-09-20
    const { result } = renderHook(() => useVisibleDate(makeUTCDate(2021, 8, 20, 12)));

    act(() => {
      result.current[1]({
        type: NAV_OPTIONS.PREVIOUS_YEAR,
      });
    });

    const expected = {
      visibleYear: 2020,
      visibleMonth: 9,
    };

    expect(result.current[0].visibleYear).toBe(expected.visibleYear);
    expect(result.current[0].visibleMonth).toBe(expected.visibleMonth);
  });
});
