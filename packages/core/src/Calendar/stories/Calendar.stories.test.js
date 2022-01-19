/* eslint-disable no-alert */

import React, { useState } from "react";
import { HvCalendar, HvCalendarHeader, HvFormElement, HvLabel, HvDropdown } from "../..";

export default {
  title: "Tests/Calendar",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCalendar } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvCalendar,
  subcomponents: { HvCalendarHeader },
};

export const Main = () => {
  const [selectionDate, setSelectionDate] = useState({
    startDate: new Date(2020, 7, 15),
    endDate: new Date(2020, 7, 29),
  });

  const [visibleMonth, setVisibleMonth] = useState(8);
  const [visibleYear, setVisibleYear] = useState(2020);

  const onChangeHandler = (event, value) => {
    if (value instanceof Date) {
      setSelectionDate({
        startDate: value,
        endDate: null,
      });
    }
    if ((selectionDate.startDate && selectionDate.endDate) || value < selectionDate.startDate) {
      setSelectionDate({
        startDate: value,
        endDate: null,
      });
    } else {
      setSelectionDate({
        startDate: selectionDate.startDate,
        endDate: value,
      });
    }
  };

  const visibleDateChangeHandler = (event, action, index) => {
    if (action === "previous_month") {
      const previousMonth = visibleMonth - 1;
      if (previousMonth < 1) {
        setVisibleMonth(12);
        setVisibleYear(visibleYear - 1);
      } else {
        setVisibleMonth(previousMonth);
      }
    } else if (action === "next_month") {
      const nextMonth = visibleMonth + 1;
      if (nextMonth > 12) {
        setVisibleMonth(1);
        setVisibleYear(visibleYear + 1);
      } else {
        setVisibleMonth(nextMonth);
      }
    } else if (action === "previous_year") {
      setVisibleYear(visibleYear - 1);
    } else if (action === "next_year") {
      setVisibleYear(visibleYear + 1);
    } else if (action === "month") {
      setVisibleMonth(index);
    }
  };

  const availableDates = {
    minimumDate: new Date(2020, 5, 1),
    maximumDate: new Date(2020, 11, 10),
  };

  return (
    <div style={{ display: "flex" }}>
      <HvFormElement value={selectionDate}>
        <HvLabel id="multi-label" label="Multi-selection Calendar">
          <HvCalendar
            id="main-calendar"
            onChange={onChangeHandler}
            onInputChange={onChangeHandler}
            onVisibleDateChange={visibleDateChangeHandler}
            visibleMonth={visibleMonth}
            visibleYear={visibleYear}
            minimumDate={availableDates.minimumDate}
            maximumDate={availableDates.maximumDate}
            locale="en-US"
          />
        </HvLabel>
      </HvFormElement>
    </div>
  );
};

Main.parameters = {
  eyes: { include: false },
};

export const SingleDate = () => {
  const [selectionDate, setSelectionDate] = useState(new Date(2020, 7, 15));

  const [visibleMonth, setVisibleMonth] = useState(8);
  const [visibleYear, setVisibleYear] = useState(2020);

  const onChangeHandler = (event, value) => {
    setSelectionDate(value);
  };

  const visibleDateChangeHandler = (event, action, index) => {
    if (action === "previous_month") {
      const previousMonth = visibleMonth - 1;
      if (previousMonth < 1) {
        setVisibleMonth(12);
        setVisibleYear(visibleYear - 1);
      } else {
        setVisibleMonth(previousMonth);
      }
    } else if (action === "next_month") {
      const nextMonth = visibleMonth + 1;
      if (nextMonth > 12) {
        setVisibleMonth(1);
        setVisibleYear(visibleYear + 1);
      } else {
        setVisibleMonth(nextMonth);
      }
    } else if (action === "previous_year") {
      setVisibleYear(visibleYear - 1);
    } else if (action === "next_year") {
      setVisibleYear(visibleYear + 1);
    } else if (action === "month") {
      setVisibleMonth(index);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <HvFormElement value={selectionDate}>
        <HvLabel id="single-label" label="Single selection calendar">
          <HvCalendar
            id="single-calendar"
            onChange={onChangeHandler}
            onInputChange={onChangeHandler}
            onVisibleDateChange={visibleDateChangeHandler}
            visibleMonth={visibleMonth}
            visibleYear={visibleYear}
            minimumDate={new Date(2020, 5, 1)}
            maximumDate={new Date(2020, 11, 10)}
            locale="en-US"
          />
        </HvLabel>
      </HvFormElement>
    </div>
  );
};

SingleDate.parameters = {
  eyes: { include: false },
};

export const Localized = () => {
  const [locale, setLocale] = useState("en-US");
  const [selectionDate, setSelectionDate] = useState(new Date(2020, 7, 19));
  const [visibleMonth, setVisibleMonth] = useState(8);
  const [visibleYear, setVisibleYear] = useState(2020);

  const onChangeHandler = (event, value) => {
    setSelectionDate(value);
  };

  const visibleDateChangeHandler = (event, action, index) => {
    if (action === "previous_month") {
      const previousMonth = visibleMonth - 1;
      if (previousMonth < 1) {
        setVisibleMonth(12);
        setVisibleYear(visibleYear - 1);
      } else {
        setVisibleMonth(previousMonth);
      }
    } else if (action === "next_month") {
      const nextMonth = visibleMonth + 1;
      if (nextMonth > 12) {
        setVisibleMonth(1);
        setVisibleYear(visibleYear + 1);
      } else {
        setVisibleMonth(nextMonth);
      }
    } else if (action === "previous_year") {
      setVisibleYear(visibleYear - 1);
    } else if (action === "next_year") {
      setVisibleYear(visibleYear + 1);
    } else if (action === "month") {
      setVisibleMonth(index);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", width: "650px" }}>
      <HvDropdown
        id="dropdown7"
        onChange={(item) => setLocale(item.id)}
        values={[
          { id: "pt", label: "Portuguese" },
          { id: "en", label: "English" },
        ]}
        label="Select language"
      />
      <HvFormElement value={selectionDate} locale={locale}>
        <HvLabel id="locale-label" label="Calendar that changes location">
          <HvCalendar
            id="locale-calendar"
            onChange={onChangeHandler}
            onInputChange={onChangeHandler}
            onVisibleDateChange={visibleDateChangeHandler}
            visibleMonth={visibleMonth}
            visibleYear={visibleYear}
            minimumDate={new Date(2020, 5, 1)}
            maximumDate={new Date(2020, 11, 10)}
            locale={locale}
          />
        </HvLabel>
      </HvFormElement>
    </div>
  );
};

Localized.parameters = {
  docs: {
    description: {
      story:
        "Warning: Changing this sample locale changes the locale for all samples. Locales should be loaded by the user.",
    },
  },
  eyes: { include: false },
};
