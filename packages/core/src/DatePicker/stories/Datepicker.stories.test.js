import React from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { DefaultValue, RangeWithValues } from "./Datepicker.stories";

export default {
  title: "Tests/Date Picker",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  },
  decorators: [storyFn => <div style={{ height: "600px" }}>{storyFn()}</div>]
};

// __________________________________
// Extended applitools test scenarios

// test scenario, datepicker default value opened
export const DefaultValueOpened = () => DefaultValue();

DefaultValueOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /date input/i }));
        return wait(() => screen.getByText("January"));
      }
    }
  }
};

// test scenario, datepicker months opened
export const DatepickerMonths = () => DefaultValue();

DatepickerMonths.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button", { name: /date input/i }));
        userEvent.click(screen.getByText("January"));
        return wait(() => screen.getByText("Dec"));
      }
    }
  }
};

// test scenario, dateRange default value opened
export const RangeValuesOpened = () => RangeWithValues();

RangeValuesOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /date input/i }));
        return wait(() => screen.getByText("June"));
      }
    }
  }
};

// test scenario, dateRange months opened
export const RangeMonthsOpened = () => RangeWithValues();

RangeMonthsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("textbox", { name: /date input/i }));
        userEvent.click(screen.getAllByText("June")[0]);
        userEvent.click(screen.getAllByText("June")[0]);
        return wait(() => screen.getAllByText("Dec")[1]);
      }
    }
  }
};
