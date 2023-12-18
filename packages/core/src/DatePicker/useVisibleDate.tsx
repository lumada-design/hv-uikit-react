import { Reducer, useReducer } from "react";

import { VisibilitySelectorActions } from "../Calendar";

import { validateDate } from "./utils";

function stateToLeftRight({
  visibleYear,
  visibleMonth,
  rightVisibleYear,
  rightVisibleMonth,
}) {
  return {
    left: { year: visibleYear, month: visibleMonth },
    right: { year: rightVisibleYear, month: rightVisibleMonth },
  };
}

function leftRightToState(left, right) {
  return {
    visibleYear: left.year,
    visibleMonth: left.month,
    rightVisibleYear: right.year,
    rightVisibleMonth: right.month,
  };
}

function subtractYear({ year, month }) {
  return { year: year - 1, month };
}

function addYear({ year, month }) {
  return { year: year + 1, month };
}

function subtractMonth({ year, month }) {
  let y = year;
  let m = month;

  m -= 1;
  if (m === 0) {
    y -= 1;
    m = 12;
  }

  return { year: y, month: m };
}

function addMonth({ year, month }) {
  let y = year;
  let m = month;

  m += 1;
  if (m === 13) {
    y += 1;
    m = 1;
  }

  return { year: y, month: m };
}

function ensureNoOverlap(left, right, keepRight = false) {
  let l = left;
  let r = right;
  if (
    left.year > right.year ||
    (left.year === right.year && left.month >= right.month)
  ) {
    if (keepRight) {
      l = subtractMonth(right);
    } else {
      r = addMonth(left);
    }
  }

  return leftRightToState(l, r);
}

export function isSameYearMonth(d1, d2) {
  return d1.year === d2.year && d1.month === d2.month;
}

type State = {
  visibleYear: any;
  visibleMonth: any;
  rightVisibleYear: any;
  rightVisibleMonth: any;
};
type Action = { type: VisibilitySelectorActions } & Record<string, any>;

const visibleDateReducer: Reducer<State, Action> = (state, action) => {
  let { left, right } = stateToLeftRight(state);

  switch (action.type) {
    case "previous_year":
      if (action.target === "right") {
        right = subtractYear(right);
        return ensureNoOverlap(left, right, true);
      }

      left = subtractYear(left);
      return ensureNoOverlap(left, right, false);

    case "next_year":
      if (action.target === "right") {
        right = addYear(right);
        return ensureNoOverlap(left, right, true);
      }

      left = addYear(left);
      return ensureNoOverlap(left, right, false);

    case "previous_month":
      if (action.target === "right") {
        right = subtractMonth(right);
        return ensureNoOverlap(left, right, true);
      }

      left = subtractMonth(left);
      return ensureNoOverlap(left, right, false);

    case "next_month":
      if (action.target === "right") {
        right = addMonth(right);
        return ensureNoOverlap(left, right, true);
      }

      left = addMonth(left);
      return ensureNoOverlap(left, right, false);

    case "month":
      if (action.month != null) {
        if (action.target === "right") {
          if (right.month !== action.month) {
            right = { year: right.year, month: action.month };
            return ensureNoOverlap(left, right, true);
          }
        } else if (left.month !== action.month) {
          left = { year: left.year, month: action.month };
          return ensureNoOverlap(left, right, false);
        }
      }
      break;

    case "month_year":
      if (action.month != null && action.year != null) {
        if (action.target === "right") {
          if (
            !isSameYearMonth(left, action) &&
            !isSameYearMonth(right, action)
          ) {
            right = { year: action.year, month: action.month };
            return ensureNoOverlap(left, right, true);
          }
        } else if (
          !isSameYearMonth(left, action) &&
          (action.target === "left" || !isSameYearMonth(right, action))
        ) {
          left = { year: action.year, month: action.month };
          return ensureNoOverlap(left, right, false);
        }
      }

      break;

    default:
  }

  return state;
};

function stateFromRange(startDate, endDate) {
  const initialStartDate = validateDate(startDate);
  const initialEndDate =
    endDate != null ? validateDate(endDate) : initialStartDate;

  return ensureNoOverlap(
    {
      year: initialStartDate.getFullYear(),
      month: initialStartDate.getMonth() + 1,
    },
    { year: initialEndDate.getFullYear(), month: initialEndDate.getMonth() + 1 }
  );
}

export default function useVisibleDate(startDate?: Date, endDate?: Date) {
  return useReducer(visibleDateReducer, { startDate, endDate }, (initData) =>
    stateFromRange(initData.startDate, initData.endDate)
  );
}
