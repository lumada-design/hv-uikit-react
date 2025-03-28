import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvBaseRadio,
  HvGrid,
  HvRadio,
  HvRadioProps,
  HvRadioStatus,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvRadio> = {
  title: "Components/Radio/Radio",
  component: HvRadio,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
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
    (Story) => <div className="flex flex-wrap gap-sm">{Story()}</div>,
  ],
  render: () => {
    return (
      <>
        <HvRadio name="radio" label="Radio" value="1" />
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
  },
  render: () => {
    const [secondRadioStatus, setSecondRadioStatus] =
      useState<HvRadioStatus>("standBy");
    const [firstRadioErrorMessage, setFirstRadioErrorMessage] = useState<
      string | null
    >("");

    const [secondRadioErrorMessage, setSecondRadioErrorMessage] = useState(
      "No way for the second radio to be valid!",
    );

    return (
      <HvGrid container>
        <HvGrid container item xs={12} md={6}>
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
                  "No way for the second radio to be valid! I told you!",
                );
              }}
              label="Second Radio"
            />
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={12} md={6}>
          <div
            className={css({
              backgroundColor: theme.colors.negativeDimmed,
              color: theme.colors.textDark,
              padding: theme.space.md,
            })}
          >
            <HvTypography
              component="h4"
              variant="title4"
              style={{
                color: theme.colors.textDark,
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

export const Custom: StoryObj<HvRadioProps> = {
  render: () => {
    const styles = {
      group: css({
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }),
      box: css({
        "& svg": {
          borderRadius: theme.radii.full,
          border: `1px solid ${theme.colors.warning}`,
        },
      }),
      checked: css({
        "& svg": {
          border: `1px solid ${theme.colors.warning}`,
          backgroundColor: theme.colors.bgContainer,
          color: theme.colors.warning,
        },
      }),
    };

    return (
      <div className={styles.group}>
        <HvRadio
          label="Radio 1"
          classes={{ root: styles.box, checked: styles.checked }}
        />
      </div>
    );
  },
};

export const Test: StoryObj<HvRadioProps> = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <>
      <HvRadio disabled label="Disabled" />
      <HvRadio disabled defaultChecked label="Disabled" />
      <HvRadio readOnly label="Readonly" />
      <HvRadio readOnly defaultChecked label="Readonly" />
      <HvRadio required label="Required" />
      <HvRadio required defaultChecked label="Required" />
      <HvRadio status="invalid" statusMessage="Oh no!" label="Invalid" />
      <HvRadio
        status="invalid"
        statusMessage="Oh no!"
        defaultChecked
        label="Invalid"
      />
      <HvRadio semantic label="Semantic" />
      <HvRadio semantic defaultChecked label="Semantic" />
      <HvRadio aria-label="radio" />
      <HvRadio defaultChecked aria-label="radio" />
      <HvRadio defaultChecked disabled aria-label="radio" />
    </>
  ),
};
