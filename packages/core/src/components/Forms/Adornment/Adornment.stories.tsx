import { Preview } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { HvAdornment, HvAdornmentProps } from "components";

const meta: Meta<typeof HvAdornment> = {
  title: "Guides/Forms/Form Element Blocks/Adornment",
  component: HvAdornment,
};
export default meta;

export const Main: StoryObj<HvAdornmentProps> = {
  args: {
    showWhen: "valid",
    icon: <Preview />,
    isVisible: true,
    onClick: () => alert("Clicked the icon"),
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  render: (args) => {
    return <HvAdornment {...args}>List</HvAdornment>;
  },
};
