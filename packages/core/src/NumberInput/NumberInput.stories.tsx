import { Meta, StoryObj } from "@storybook/react";
import {
  HvBannerContent,
  HvNumberInput,
  HvNumberInputProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvNumberInput> = {
  title: "Components/Number Input",
  component: HvNumberInput,
};
export default meta;

export const Main: StoryObj<HvNumberInputProps> = {
  args: {
    label: "Value",
    description: "Please enter a number",
    placeholder: "Enter a number here...",
    disabled: false,
    readOnly: false,
    required: true,
    status: "valid",
    statusMessage: "My status message",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-md">
        <HvBannerContent variant="warning">
          <HvTypography>
            The HvNumberInput component shares the same API as the `HvInput`
            component. Please check the{" "}
            <HvTypography
              className="color-primary underline underline-primary"
              component="a"
              href="/?path=/docs/components-input--docs"
            >
              HvInput component page
            </HvTypography>{" "}
            for documentation.
          </HvTypography>
        </HvBannerContent>
        <HvNumberInput {...args} />
      </div>
    );
  },
};
