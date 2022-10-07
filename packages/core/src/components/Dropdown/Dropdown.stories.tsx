import { Meta } from "@storybook/react";
import { HvBox, HvDropdown } from "components";

export default {
  component: HvDropdown,
  title: "Dropdown",
} as Meta;

export const Primary = () => {
  return (
    <HvBox sx={{ width: 200, height: 200, position: "relative" }}>
      <HvDropdown
        value="value1"
        options={[
          { label: "Label 1", value: "value1" },
          { label: "Label 2", value: "value2" },
          { label: "Label 3", value: "value3" },
        ]}
      />
    </HvBox>
  );
};
