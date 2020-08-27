import React from "react";

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
