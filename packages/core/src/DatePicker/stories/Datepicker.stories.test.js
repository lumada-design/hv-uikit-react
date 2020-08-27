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
