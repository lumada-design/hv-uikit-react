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
          height: "calc(100vh - 32px)",
          position: "relative",
        }}
      >
        {Story()}
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `This sample exemplifies how the canvas components can be used.<br/>
          \nDISCLAIMER: Canvas components are a work in progress and there might be breaking changes.`,
      },
      source: {
        code: MainRaw,
      },
    },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openBtn = canvas.getByRole("button", {
      name: /Open/i,
    });
    await userEvent.click(openBtn);
    const toggleBtn = canvas.getByRole("button", {
      name: /Toggle/i,
    });
    await userEvent.click(toggleBtn);
  },
  render: () => <MainStory />,
};
