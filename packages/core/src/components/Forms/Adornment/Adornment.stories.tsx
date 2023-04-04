import { useState } from "react";
import styled from "@emotion/styled";
import {
  Fail,
  Preview,
  PreviewOff,
  Success,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvAdornment,
  HvAdornmentProps,
  HvBaseInput,
  HvButton,
  HvFormElement,
  HvFormStatus,
  HvLabel,
} from "~/components";

const StyledButton = styled(HvButton)({
  width: "250px",
  height: "50px",
  margin: "10px",
});

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

export const InputAdornment: StoryObj<HvAdornmentProps> = {
  render: () => {
    const [isPassword, setPasswordType] = useState(true);
    const toggleType = () => {
      setPasswordType(!isPassword);
    };
    const getIcon = (isPass) => (isPass ? <Preview /> : <PreviewOff />);

    return (
      <HvFormElement status="standBy">
        <HvLabel id="controlled-input-label" label="Password">
          <HvBaseInput
            id="controlled-input"
            defaultValue="p455w0rd"
            type={isPassword ? "password" : "text"}
            placeholder="Insert your password"
            endAdornment={
              <HvAdornment
                aria-label="show password"
                icon={getIcon(isPassword)}
                onClick={toggleType}
              />
            }
          />
        </HvLabel>
      </HvFormElement>
    );
  },
};

export const DynamicAdornments: StoryObj<HvAdornmentProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Adornment showcasing the ability to react to the form element status.",
      },
    },
  },
  render: () => {
    const [status, setStatus] = useState<HvFormStatus>("valid");

    return (
      <>
        <HvFormElement status={status}>
          <HvLabel label="First name">
            <HvBaseInput
              id="valid-controlled-input"
              defaultValue="content"
              placeholder="Insert your name"
              endAdornment={
                <>
                  <HvAdornment
                    showWhen="invalid"
                    icon={<Fail semantic="negative" />}
                  />
                  <HvAdornment
                    showWhen="valid"
                    icon={<Success semantic="positive" />}
                  />
                </>
              }
            />
          </HvLabel>
        </HvFormElement>
        <StyledButton
          onClick={() => {
            setStatus("valid");
          }}
        >
          Set valid
        </StyledButton>
        <StyledButton
          onClick={() => {
            setStatus("invalid");
          }}
        >
          Set invalid
        </StyledButton>
      </>
    );
  },
};
