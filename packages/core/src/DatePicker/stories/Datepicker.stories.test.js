// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React from "react";
import { DefaultValue, RangeWithValues } from "./Datepicker.stories";

export default {
  title: "Tests/Date Picker",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [(storyFn) => <div style={{ height: "600px", padding: 10 }}>{storyFn()}</div>],
};

// __________________________________
// Extended applitools test scenarios

const openCombobox = async () => {
  fireEvent.click(screen.getByRole("combobox"));

  const tooltip = await screen.findByRole("tooltip");

  // extra buffer to allow popper layout
  return new Promise((resolve) => setTimeout(() => resolve(tooltip), 1000));
};

// test scenario, datepicker default value opened
export const DefaultValueOpened = () => DefaultValue();

DefaultValueOpened.parameters = {
  eyes: {
    runBefore() {
      return openCombobox();
    },
  },
};

// test scenario, datepicker months opened
export const DatepickerMonths = () => DefaultValue();

DatepickerMonths.parameters = {
  eyes: {
    runBefore: async () => {
      await openCombobox();

      fireEvent.click(screen.getByText("October"));

      return waitFor(() => screen.getByRole("button", { name: "Dec" }));
    },
  },
};

// test scenario, dateRange default value opened
export const RangeValuesOpened = () => RangeWithValues();

RangeValuesOpened.parameters = {
  eyes: {
    runBefore() {
      return openCombobox();
    },
  },
};

// test scenario, dateRange months opened
export const RangeMonthsOpened = () => RangeWithValues();

RangeMonthsOpened.parameters = {
  eyes: {
    runBefore: async () => {
      await openCombobox();

      fireEvent.click(screen.getAllByText("July")[0]);
      fireEvent.click(screen.getAllByText("August")[0]);

      return waitFor(() => screen.getAllByRole("button", { name: "Dec" }));
    },
  },
};
