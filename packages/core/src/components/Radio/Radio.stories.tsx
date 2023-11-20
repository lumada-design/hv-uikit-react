import { useState } from "react";
import {
  HvBaseRadio,
  HvGrid,
  HvRadio,
  HvRadioProps,
  HvRadioStatus,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HvRadio> = {
  title: "Components/Radio/Radio",
  component: HvRadio,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvBaseRadio },
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
  argTypes: {
    classes: { control: { disable: true } },
    labelProps: { control: { disable: true } },
    inputProps: { control: { disable: true } },
  },
  render: (args) => {
    return <HvRadio {...args} />;
  },
};

export const Variants: StoryObj<HvRadioProps> = {
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          "& > div": {
            width: 160,
          },
        })}
      >
        {Story()}
      </div>
    ),
  ],
  render: () => {
    return (
      <>
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
      </>
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
        <HvGrid item xs={12} md={6}>
          <HvGrid container>
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
        </HvGrid>
        <HvGrid item xs={12} md={6}>
          <div
            className={css({
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
              padding: theme.space.md,
            })}
          >
            <HvTypography
              component="h4"
              variant="title4"
              style={{
                color: theme.colors.base_dark,
              }}
            >
              Form errors:
            </HvTypography>
            <ul
              className={css({
                margin: theme.spacing("sm", 0),
                paddingLeft: theme.space.md,
              })}
            >
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
    );
  },
};
