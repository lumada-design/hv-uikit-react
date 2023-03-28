import styled from "@emotion/styled";
import { HvBaseRadio, HvGrid } from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { useState } from "react";
import { HvRadio, HvRadioProps, HvRadioStatus } from "./Radio";
import { Meta, StoryObj } from "@storybook/react";

const StyledDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  "& > *": {
    margin: "0 10px 5px 0",
  },
});

const FlexDecorator = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const meta: Meta<typeof HvRadio> = {
  title: "Components/Radio/Radio",
  component: HvRadio,
  subcomponents: { HvBaseRadio },
  decorators: [(Story) => <FlexDecorator>{Story()}</FlexDecorator>],
};
export default meta;

export const Main: StoryObj<HvRadioProps> = {
  args: {
    name: "main",
    label: "Radio 1",
    value: "on",
    required: false,
    readOnly: false,
    disabled: false,
    checked: false,
    defaultChecked: false,
    semantic: false,
    status: "standBy",
    statusMessage: "This is Invalid",
  },
  argTypes: {},
  render: (args) => {
    return (
      <HvRadio
        name={args.name}
        label={args.label}
        value={args.value}
        required={args.required}
        checked={args.checked}
        defaultChecked={args.defaultChecked}
        semantic={args.semantic}
        status={args.status}
        statusMessage={args.statusMessage}
      />
    );
  },
};

export const Disabled: StoryObj<HvRadioProps> = {
  render: ({}) => {
    const [checkedValue, setCheckedValue] = useState("1");

    return (
      <>
        <HvRadio
          disabled
          name="disabled"
          label="Radio 1"
          value="1"
          checked={checkedValue === "1"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
        <HvRadio
          disabled
          name="disabled"
          label="Radio 2"
          value="2"
          checked={checkedValue === "2"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
      </>
    );
  },
};

Disabled.parameters = {
  docs: {
    description: { story: "Disabled radio buttons." },
  },
};

export const ReadOnly: StoryObj<HvRadioProps> = {
  render: ({}) => {
    const [checkedValue, setCheckedValue] = useState("2");

    return (
      <>
        <HvRadio
          readOnly
          name="readonly"
          label="Radio 1"
          value="1"
          checked={checkedValue === "1"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
        <HvRadio
          readOnly
          name="readonly"
          label="Radio 2"
          value="2"
          checked={checkedValue === "2"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
      </>
    );
  },
};

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable radio buttons." },
  },
};

export const WithoutLabel: StoryObj<HvRadioProps> = {
  render: ({}) => {
    const [checkedValue, setCheckedValue] = useState("2");

    return (
      <>
        <HvRadio
          name="nolabel"
          aria-label="Radio 1"
          value="1"
          checked={checkedValue === "1"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
        <HvRadio
          name="nolabel"
          aria-label="Radio 2"
          value="2"
          checked={checkedValue === "2"}
          onChange={(_evt, _checked, value) => setCheckedValue(value)}
        />
      </>
    );
  },
};

WithoutLabel.parameters = {
  docs: {
    description:
      "Radio buttons without labels. The accessible name is provided via the `aria-label` property.",
  },
};

export const ErrorMessage: StoryObj<HvRadioProps> = {
  render: ({}) => {
    return (
      <HvRadio
        status="invalid"
        statusMessage="No way for this to be valid!"
        label="Radio 1"
      />
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvRadioProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
    },
    eyes: { include: false },
  },
  render: ({}) => {
    const [secondRadioStatus, setSecondRadioStatus] =
      useState<HvRadioStatus>("standBy");
    const [firstRadioErrorMessage, setFirstRadioErrorMessage] = useState<
      string | null
    >("");

    const [secondRadioErrorMessage, setSecondRadioErrorMessage] = useState(
      "No way for the second radio to be valid!"
    );

    return (
      <HvGrid container>
        <HvGrid item xs={5} container>
          <HvGrid item xs={12}>
            <HvRadio
              status={secondRadioStatus}
              aria-errormessage="firstRadio-error"
              onChange={(_e, checked) => {
                if (checked) {
                  setSecondRadioStatus("invalid");
                  setFirstRadioErrorMessage("Don't choose the first radio.");
                } else if (!checked) {
                  setSecondRadioStatus("valid");
                  setFirstRadioErrorMessage(null);
                }
              }}
              label="First Radio"
            />
          </HvGrid>
          <HvGrid item xs={12}>
            <HvRadio
              status="invalid"
              aria-errormessage="secondRadio-error"
              onChange={() => {
                setSecondRadioErrorMessage(
                  "No way for the second radio to be valid! I told you!"
                );
              }}
              label="Second Radio"
            />
          </HvGrid>
        </HvGrid>
        <HvGrid container item xs={7}>
          <HvGrid
            style={{
              backgroundColor: theme.colors.sema9,
              color: theme.colors.base2,
            }}
            item
            xs={12}
            alignItems="center"
          >
            <div
              style={{
                paddingBottom: "10px",
              }}
            >
              <h4
                style={{
                  marginTop: "0",
                }}
              >
                Form errors:
              </h4>
              <ul>
                {firstRadioErrorMessage && (
                  <li id="firstRadio-error" aria-live="polite">
                    {firstRadioErrorMessage}
                  </li>
                )}
                {secondRadioErrorMessage && (
                  <li id="secondRadio-error" aria-live="polite">
                    {secondRadioErrorMessage}
                  </li>
                )}
              </ul>
            </div>
          </HvGrid>
        </HvGrid>
      </HvGrid>
    );
  },
};
