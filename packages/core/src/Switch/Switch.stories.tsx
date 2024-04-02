import { useRef, useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvBaseSwitch,
  HvButton,
  HvGrid,
  HvInfoMessage,
  HvLabel,
  HvSwitch,
  HvSwitchProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const decorator: Decorator = (Story) => (
  <div
    className={css({
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.space.md,
    })}
  >
    {Story()}
  </div>
);

const meta: Meta<typeof HvSwitch> = {
  title: "Components/Switch",
  component: HvSwitch,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvBaseSwitch },
};

export default meta;

export const Main: StoryObj<HvSwitchProps> = {
  args: {
    value: "on",
    label: "Main Switch",
    required: false,
    readOnly: false,
    disabled: false,
    checked: undefined,
    defaultChecked: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    labelProps: { control: { disable: true } },
    status: { control: { disable: true } },
    inputProps: { control: { disable: true } },
  },
  render: (args) => {
    return <HvSwitch {...args} />;
  },
};

export const Variants: StoryObj<HvSwitchProps> = {
  decorators: [decorator],
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => {
    const styles = {
      group: css({
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }),
    };

    return (
      <>
        <div className={styles.group}>
          <HvSwitch required aria-label="Engine 1" label="Required" />
          <HvSwitch defaultChecked required aria-label="Engine 2" />
        </div>
        <div className={styles.group}>
          <HvSwitch disabled aria-label="Engine 1" label="Disabled" />
          <HvSwitch defaultChecked disabled aria-label="Engine 2" />
        </div>
        <div className={styles.group}>
          <HvSwitch readOnly aria-label="Engine 1" label="Readonly" />
          <HvSwitch defaultChecked readOnly aria-label="Engine 2" />
        </div>
        <div className={styles.group}>
          <HvSwitch
            status="invalid"
            statusMessage="On no!"
            aria-label="Engine 1"
            label="Invalid"
          />
          <HvSwitch
            defaultChecked
            status="invalid"
            statusMessage="On no!"
            aria-label="Engine 2"
          />
        </div>
      </>
    );
  },
};

export const Controlled: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: { story: "Controlled Switch." },
    },
  },
  decorators: [decorator],
  render: () => {
    const [state, setState] = useState(false);

    return (
      <>
        <HvButton onClick={() => setState((prev) => !prev)}>Toggle</HvButton>
        <HvSwitch
          checked={state}
          aria-label="Engine Control"
          onChange={(_evt, newChecked) => setState(newChecked)}
        />
        <HvTypography
          style={{ color: state ? theme.colors.positive : theme.colors.sema14 }}
        >
          The switch is {state ? "On" : "Off"}
        </HvTypography>
      </>
    );
  },
};

export const WithLabels: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Sample showing usage of custom switch labels and description, built using `HvBaseSwitch`. The labels can also be clicked to trigger the switch",
      },
    },
  },
  render: () => {
    const inputRef = useRef<HTMLButtonElement>(null);

    const ToggleLabel = (props: React.HTMLAttributes<HTMLDivElement>) => (
      <div
        aria-hidden
        style={{ cursor: "pointer" }}
        onClick={() => inputRef.current?.click()}
        {...props}
      />
    );

    return (
      <>
        <div className={css({ display: "flex", alignItems: "flex-start" })}>
          <HvLabel
            id="switch-label"
            label="Engine Control"
            htmlFor="switch-input"
          />
          <HvInfoMessage id="switch-description">
            This is a custom description
          </HvInfoMessage>
        </div>
        <div className={css({ display: "flex", alignItems: "center", gap: 8 })}>
          <ToggleLabel>Off</ToggleLabel>
          <HvBaseSwitch inputRef={inputRef} id="switch-input" defaultChecked />
          <ToggleLabel>On</ToggleLabel>
        </div>
      </>
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is responsibility of the app.",
      },
    },
  },
  render: () => {
    const [firstSwitchErrorMessage, setFirstSwitchErrorMessage] = useState("");
    const [secondSwitchErrorMessage, setSecondSwitchErrorMessage] = useState(
      "No way for the second switch to be valid!",
    );

    return (
      <HvGrid container>
        <HvGrid container item xs={12} md={6}>
          <HvGrid item xs={12}>
            <HvSwitch
              required
              defaultChecked
              aria-errormessage="firstSwitch-error"
              onChange={(_e, checked) => {
                setFirstSwitchErrorMessage(
                  checked ? "" : "You must turn on the first switch",
                );
              }}
              label="First Switch"
            />
          </HvGrid>
          <HvGrid item xs={12}>
            <HvSwitch
              status="invalid"
              aria-errormessage="secondSwitch-error"
              onChange={() => {
                setSecondSwitchErrorMessage(
                  "No way for the second switch to be valid! I told you!",
                );
              }}
              label="Second Switch"
            />
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
              {firstSwitchErrorMessage && (
                <li id="firstSwitch-error" aria-live="polite">
                  {firstSwitchErrorMessage}
                </li>
              )}
              {secondSwitchErrorMessage && (
                <li id="secondSwitch-error" aria-live="polite">
                  {secondSwitchErrorMessage}
                </li>
              )}
            </ul>
          </div>
        </HvGrid>
      </HvGrid>
    );
  },
};
