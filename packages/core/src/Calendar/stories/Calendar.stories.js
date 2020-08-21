/* eslint-disable no-alert */

import React, { useState } from "react";
import moment from "moment";
import { NAV_OPTIONS } from "../enums";
import { getPreviousMonth, getNextMonth } from "../utils";
import { HvCalendar, HvInput, HvButton } from "../..";

export default {
  title: "Components/Calendar",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCalendar } from '@hv/uikit-react-core/dist'"
  },
  component: HvCalendar
};

const navigateTo = (navOptions, month = 1, year = 2000) => {
  let newMonthYear;

  switch (navOptions) {
    case NAV_OPTIONS.PREVIOUS_MONTH:
      newMonthYear = getPreviousMonth(month, year);
      break;
    default:
    case NAV_OPTIONS.NEXT_MONTH:
      newMonthYear = getNextMonth(month, year);
      break;
    case NAV_OPTIONS.PREVIOUS_YEAR:
      newMonthYear = { month, year: year - 1 };
      break;
    case NAV_OPTIONS.NEXT_YEAR:
      newMonthYear = { month, year: year + 1 };
      break;
    case NAV_OPTIONS.MONTH:
      newMonthYear = { month, year };
      break;
    case NAV_OPTIONS.MONTH_YEAR:
      newMonthYear = { month, year };
      break;
  }

  return newMonthYear;
};

export const MainStory = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar />
    </div>
  );
};

export const CalendarWithDateSelected = () => {
  const selectionDate = new Date("2020-08-19");

  return (
    <div style={{ display: "flex" }}>
      <HvCalendar selectedValue={selectionDate} onChange={date => alert(`Click: ${date}`)} />
    </div>
  );
};

export const ControlledDateSelectionCalendar = () => {
  const [date, setDate] = useState(new Date("2000-01-01"));

  return (
    <div style={{ display: "flex" }}>
      <HvCalendar selectedValue={date} onChange={clickedDate => setDate(clickedDate)} />
    </div>
  );
};

export const ControlledMonthYearCalendar = () => {
  const [navMonth, setNavMonth] = useState(1);
  const [navYear, setNavYear] = useState(2000);

  return (
    <div style={{ display: "flex" }}>
      <HvCalendar
        visibleMonth={navMonth}
        visibleYear={navYear}
        handleVisibleDateChange={changeDirection => {
          const { month, year } = navigateTo(changeDirection, navMonth, navYear);
          setNavMonth(month);
          setNavYear(year);
          return { month, year };
        }}
        onChange={date => alert(`Click: ${date}`)}
      />
    </div>
  );
};

export const WithPresetSelectionRangeCalendar = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar valueRange={{ startDate: "2020-08-19", endDate: "2020-09-20" }} />
    </div>
  );
};

export const WithMinMaxDisabledRangeCalendar = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar minimumDate="2020-08-01" maximumDate="2020-09-10" />
    </div>
  );
};

export const WithMinDisabledRangeCalendar = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar minimumDate="2020-08-01" />
    </div>
  );
};

export const WithMaxDisabledRangeCalendar = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar maximumDate="2020-08-10" />
    </div>
  );
};

// improve so that localization can be set
export const Localized = () => {
  const [locale, setLocale] = useState("pt-PT");

  return (
    <>
      <HvInput
        labels={{ inputLabel: "Locale" }}
        type="text"
        value={locale}
        style={{ marginBottom: "20px", width: "150px" }}
        onChange={value => setLocale(value)}
      />
      <HvCalendar locale={locale} id="Calendar" />
    </>
  );
};

export const WithValueChange = () => {
  const Example = () => {
    const [date, setDate] = useState("2020-01-01");

    const addDay = () =>
      setDate(
        moment(date)
          .add(1, "day")
          .format("YYYY-MM-DD")
      );

    return (
      <>
        <HvButton id="AddButton" onClick={addDay}>
          Add a day
        </HvButton>
        <p />
        <HvCalendar id="DatePicker" value={date} onChange={d => setDate(d)} />
      </>
    );
  };

  return <Example />;
};
