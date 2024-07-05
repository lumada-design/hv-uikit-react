import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { MainStory } from "./Main";
import MainRaw from "./Main?raw";

const meta: Meta = {
  title: "Lab/Canvas",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};
export default meta;

export const Main: StoryObj = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        {Story()}
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: /Open/i,
    });
    await userEvent.click(button);
  },
  render: () => <MainStory />,
};
