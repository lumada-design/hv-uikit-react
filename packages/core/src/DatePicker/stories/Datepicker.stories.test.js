import React from "react";

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
    eyes: {}
  }
};

// test scenario, datepicker months opened
export const DatepickerMonths = () => DefaultValue();

DatepickerMonths.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, dateRange default value opened
export const RangeValuesOpened = () => RangeWithValues();

RangeValuesOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, dateRange months opened
export const RangeMonthsOpened = () => RangeWithValues();

RangeMonthsOpened.story = {
  parameters: {
    eyes: {}
  }
};
