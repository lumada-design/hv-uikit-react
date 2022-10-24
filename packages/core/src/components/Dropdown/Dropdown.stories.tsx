import { StoryObj } from "@storybook/react";
import { Dropdown, DropdownProps } from "./Dropdown";
import { Box } from "../Box";

export default { component: Dropdown, title: "Inputs/Dropdown" };

export const Main: StoryObj<DropdownProps> = {
  args: {
    value: "value1",
    options: [
      { label: "Label 1", value: "value1" },
      { label: "Label 2", value: "value2" },
      { label: "Label 3", value: "value3" },
    ],
  },
  render: ({ value, options }) => (
    <Box sx={{ width: 200, height: 200, position: "relative" }}>
      <Dropdown value={value} options={options} />
    </Box>
  ),
};
