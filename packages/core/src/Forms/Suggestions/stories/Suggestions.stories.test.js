import React from "react";

import { Main } from "./Suggestions.stories";

export default {
  title: "Tests/Forms/Suggestions",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  },
  decorators: [
    Story => (
      <div style={{ width: 500, height: 200 }}>
        <Story />
      </div>
    )
  ]
};
