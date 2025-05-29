import { useRef, useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  HvBaseSwitch,
  HvInfoMessage,
  HvLabel,
  HvSwitch,
  HvSwitchProps,
} from "@hitachivantara/uikit-react-core";

const decorator: Decorator = (Story) => (
  <div className="flex flex-wrap items-center gap-md">{Story()}</div>
);

const meta: Meta<typeof HvSwitch> = {
  title: "Components/Switch",
  component: HvSwitch,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
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
  render: () => {
    const styles = {
      group: "flex items-end",
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

export const WithCustomColors: StoryObj<HvSwitchProps> = {
  parameters: {
    docs: {
      description: { story: "With custom colors." },
    },
  },
  decorators: [decorator],
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <HvSwitch
        checked={checked}
        aria-label="Engine Control"
        onChange={(_evt, newChecked) => setChecked(newChecked)}
        color={checked ? "positive" : "negative"}
      />
    );
  },
};
