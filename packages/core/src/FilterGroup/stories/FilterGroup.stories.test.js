import React from "react";
import { screen, fireEvent } from "@storybook/testing-library";
import { Main as MainSample, ResetToDefault as ResetSample } from "./FilterGroup.stories";

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
export const ResetToDefault = () => <ResetSample />;

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
