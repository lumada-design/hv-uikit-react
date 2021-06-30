import React from "react";
import { screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import { Main as MainSample } from "./FilterGroup.stories";

export default {
  title: "Tests/Filter Group",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 550 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => <MainSample />;

Main.parameters = {
  docs: {
    disable: true,
  },
  eyes: {
    runBefore() {
      const dropdownElement = screen.getByRole("combobox");
      fireEvent.click(dropdownElement);

      // extra buffer to allow popper layout
      return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    },
  },
};
