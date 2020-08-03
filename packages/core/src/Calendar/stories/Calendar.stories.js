/* eslint-disable no-alert */
import React, { useState } from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core";
import { Caution } from "@hv/uikit-react-icons/dist";
import { HvCalendar, HvGrid, HvInput, HvButton } from "../..";

export default {
  title: "Components/Calendar",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCalendar } from '@hv/uikit-react-core/dist'"
  },
  component: HvCalendar
};

// any other clever way of doing this?
// the sample source code will have HvButtonWithMargin instead of HvButton...
// const HvCalendarWithMargin = withStyles({
//   root: {
//     margin: "0 5px"
//   }
// })(HvCalendar);

export const MainStory = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvCalendar />
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
