import { Meta, StoryObj } from "@storybook/react";
import { HvSuggestions, HvSuggestionsProps } from "components";

const meta: Meta<typeof HvSuggestions> = {
  title: "Guides/Forms/Form Element Blocks/Suggestions",
  component: HvSuggestions,
  decorators: [
    (Story) => <div style={{ width: 500, height: 320 }}>{Story()}</div>,
  ],
};
export default meta;

export const Main: StoryObj<HvSuggestionsProps> = {
  args: {
    expanded: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvSuggestions {...args}>List</HvSuggestions>;
  },
};
