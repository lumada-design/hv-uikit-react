import React from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

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

// __________________________________
// Extended applitools test scenarios

// test scenario, list suggestion on typing
export const ListSuggestionsOnTyping = () => Main();

ListSuggestionsOnTyping.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.type(screen.getByRole("textbox", { name: /select country/i }), "P");
        return wait(() => screen.getByText("Portugal"));
      }
    }
  }
};
