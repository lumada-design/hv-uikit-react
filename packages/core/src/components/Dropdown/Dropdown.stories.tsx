import { Meta } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { Box } from "../Box";

export default {
  component: Dropdown,
  title: "Dropdown",
} as Meta;

export const Primary = () => {
  return (
    <Box sx={{ width: 200, height: 200, position: "relative" }}>
      <Dropdown
        value="value1"
        options={[
          { label: "Label 1", value: "value1" },
          { label: "Label 2", value: "value2" },
          { label: "Label 3", value: "value3" },
        ]}
      />
    </Box>
  );
};
