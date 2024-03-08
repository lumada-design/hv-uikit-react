import { Meta, StoryObj } from "@storybook/react";
import {
  HvIconButton,
  HvIconButtonProps,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Delete,
  Download,
  DropLeft,
} from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvIconButton> = {
  title: "Components/Icon Button",
  component: HvIconButton,
};
export default meta;

export const Main: StoryObj<HvIconButtonProps> = {
  args: {
    title: "Download",
  },
  argTypes: {
    tooltipProps: { control: { disable: true } },
    component: { control: { disable: true } },
    ref: { control: { disable: true } },
  },
  render: (args) => (
    <HvIconButton {...(args as HvIconButtonProps)}>
      <Download />
    </HvIconButton>
  ),
};

export const Disabled: StoryObj<HvIconButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "For accessibility purposes, when disabled the button will be focusable and the tooltip will be shown when the button is hovered.",
      },
    },
  },
  render: () => (
    <HvIconButton disabled title="Add">
      <Add />
    </HvIconButton>
  ),
};

export const Variants: StoryObj<HvIconButtonProps> = {
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: theme.space.sm }}>
        {Story()}
      </div>
    ),
  ],
  render: () => (
    <>
      <HvIconButton title="Go back" variant="primary">
        <DropLeft />
      </HvIconButton>
      <HvIconButton title="Add" variant="primaryGhost">
        <Add />
      </HvIconButton>
      <HvIconButton title="Delete" size="xl" variant="secondarySubtle">
        <Delete />
      </HvIconButton>
      <HvIconButton title="Download" variant="primarySubtle" size="xl">
        <Download />
      </HvIconButton>
    </>
  ),
};
