import styled from "@emotion/styled";
import { HvBaseRadio, HvGrid } from "@core/components";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSInterpolation, css } from "@emotion/css";
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HvRadio, HvRadioProps, HvRadioStatus } from "./Radio";

const StyledDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  "& > *": {
    margin: "0 10px 5px 0",
  },
});

export default {
  title: "Components/Radio/Radio",
  component: HvRadio,
  subcomponents: { HvBaseRadio },
  decorators: [(Story) => <StyledDiv>{Story()}</StyledDiv>],
} as Meta<typeof HvRadio>;

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
    return <HvRadio {...args} />;
  },
};

export const Variants: StoryObj<HvRadioProps> = {
  render: () => {
    const styles: { root: CSSInterpolation } = {
      root: {
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        "& > div": {
          width: 200,
        },
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvRadio required name="required" label="Required" value="1" />
        <HvRadio disabled name="disabled" label="Disabled" value="1" />
        <HvRadio readOnly name="readonly" label="Readonly" value="1" />
        <HvRadio
          status="invalid"
          statusMessage="Oh no!"
          name="invalid"
          label="Invalid"
          value="1"
        />
      </div>
    );
  },
};

export const WithoutLabel: StoryObj<HvRadioProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Radio buttons without labels. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
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
  render: () => {
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
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
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
