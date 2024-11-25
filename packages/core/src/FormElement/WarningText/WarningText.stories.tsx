import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvFormElement,
  HvFormStatus,
  HvWarningText,
  HvWarningTextProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvWarningText> = {
  title: "Guides/Forms/Form Element Blocks/Warning Text",
  component: HvWarningText,
  decorators: [(storyFn) => <div style={{ width: "400px" }}>{storyFn()}</div>],
};
export default meta;

export const Main: StoryObj<HvWarningTextProps> = {
  args: {
    isVisible: true,
    disabled: false,
    disableAdornment: false,
    disableBorder: false,
    disableGutter: false,
    hideText: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvWarningText {...args}>List</HvWarningText>;
  },
};

export const WarningTextWithStatus: StoryObj<HvWarningTextProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Warning text showcasing the ability to notify the user and to react to the form status.",
      },
    },
  },
  render: () => {
    const [formStatus, setFormStatus] = useState<HvFormStatus>("invalid");
    const btnStyle = { margin: "10px" };

    return (
      <HvFormElement status={formStatus}>
        <HvWarningText id="warningText-notify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been an standard dummy for a very long time
        </HvWarningText>
        <HvButton
          style={btnStyle}
          onClick={() => {
            setFormStatus("valid");
          }}
        >
          Set form as valid
        </HvButton>
        <HvButton
          style={btnStyle}
          onClick={() => {
            setFormStatus("invalid");
          }}
        >
          Set form as invalid
        </HvButton>
      </HvFormElement>
    );
  },
};
