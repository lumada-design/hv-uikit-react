import React from "react";

export default {
  title: "Tests/Forms/Suggestions",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 200 }}>
        <Story />
      </div>
    ),
  ],
};
