import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import {
  HvCanvasToolbar,
  HvCanvasToolbarProps,
} from "@hitachivantara/uikit-react-lab";

import { CustomStory } from "./stories/Custom";
import CustomRaw from "./stories/Custom?raw";

const meta: Meta<typeof HvCanvasToolbar> = {
  title: "Lab/Canvas/Toolbar",
  component: HvCanvasToolbar,
  decorators: [
    (Story) => (
      <div
        style={{
          height: 54,
        }}
      >
        {Story()}
      </div>
    ),
  ],
};
export default meta;

const classes = {
  toolbar: css({ position: "relative" }), // for Storybook purposes
};

export const Main: StoryObj<HvCanvasToolbarProps> = {
  args: {
    title: "Toolbar Title",
  },
  argTypes: {
    backButton: { control: { disable: true } },
    classes: { control: { disable: true } },
    labels: { control: { disable: true } },
    backButtonProps: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvCanvasToolbar {...args} className={classes.toolbar}>
        <HvButton variant="primary">Save</HvButton>
        <HvButton variant="primaryGhost">Cancel</HvButton>
      </HvCanvasToolbar>
    );
  },
};

export const Custom: StoryObj<HvCanvasToolbarProps> = {
  parameters: {
    docs: {
      source: {
        code: CustomRaw,
      },
    },
  },
  render: () => <CustomStory />,
};
