import { useState } from "react";
import { css } from "@emotion/css";
import type { CSSInterpolation } from "@emotion/serialize";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvButton,
  HvTimePicker,
  HvTimePickerProps,
  HvTimePickerValue,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { setupChromatic } from ".storybook/setupChromatic";

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
} satisfies Meta<typeof HvTimePicker>;

const makeDecorator =
  (style: CSSInterpolation): Decorator =>
  (Story) => <div className={css(style)}>{Story()}</div>;

export const Main: StoryObj<HvTimePickerProps> = {
  args: {
    label: "Time Picker",
    description: "",
    placeholder: "Select a date",
    timeFormat: "24",
  },
  argTypes: {
    classes: { control: { disable: true } },
    value: { control: { disable: true } },
    defaultValue: { control: { disable: true } },
    dropdownProps: { control: { disable: true } },
  },
  decorators: [makeDecorator({ minHeight: 200, width: 200 })],
  render: (args) => {
    return <HvTimePicker {...args} />;
  },
};

export const Form: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A Time Picker usage inside a form`form`. Give `HvTimePicker` a `name`, and it will be included in the form data, \
          following the time [`input` format](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).",
      },
    },
  },
  decorators: [makeDecorator({ minHeight: 200, width: 200 })],
  render: () => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries());
          alert(JSON.stringify(data));
        }}
      >
        <HvTimePicker
          name="scheduleTime"
          label="Time Picker"
          defaultValue={{ hours: 5, minutes: 30, seconds: 14 }}
          onChange={console.log}
        />
        <br />
        <HvButton type="submit">Submit</HvButton>
      </form>
    );
  },
};

export const Variants: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Time Pickers in their various form state variants. `defaultValue` is used to configure the _uncontrolled_ initial value.",
      },
    },
    ...setupChromatic(["DS3 dawn", "DS5 dawn", "Pentaho+ dawn"]),
  },
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /required/i });
    await userEvent.click(picker);
  },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-sm [&>*]:w-200px">{Story()}</div>
    ),
  ],
  render: () => {
    const value: HvTimePickerValue = { hours: 5, minutes: 30, seconds: 14 };

    return (
      <>
        <HvTimePicker required label="Required" defaultValue={value} />
        <HvTimePicker disabled label="Disabled" defaultValue={value} />
        <HvTimePicker readOnly label="Read-only" defaultValue={value} />
        <HvTimePicker
          label="Invalid"
          status="invalid"
          statusMessage="This is an invalid time"
          defaultValue={value}
        />
        <HvTimePicker
          showSeconds={false}
          label="Hide Seconds"
          defaultValue={value}
        />
      </>
    );
  },
};

export const Controlled: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Using `HvTimePicker` with _controlled_ state, using the `value` with initial `null` state to render the placeholder.",
      },
    },
  },
  decorators: [makeDecorator({ minHeight: 200, width: 200 })],
  render: () => {
    const [value, setValue] = useState<HvTimePickerProps["value"]>(null);

    const prettyValue = value
      ? `${value.hours}h ${value.minutes}'${value.seconds}"`
      : "—";

    return (
      <>
        <HvTypography variant="title4">Date: {prettyValue}</HvTypography>
        <br />
        <HvTimePicker
          label="Time Picker"
          placeholder="Select a time"
          value={value}
          onChange={setValue}
        />
        <br />
        <HvButton
          variant="secondarySubtle"
          disabled={!value}
          onClick={() => {
            setValue((d) => d && { ...d, minutes: (d.minutes + 1) % 60 });
          }}
        >
          +1 minute
        </HvButton>
      </>
    );
  },
};

export const Format12Hours: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the `timeFormat` prop to force either the 12-hour or 24-hour clock format.",
      },
    },
    ...setupChromatic(),
  },
  decorators: [makeDecorator({ minHeight: 200, width: 220 })],
  // For visual testing and a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /time picker/i });
    await userEvent.click(picker);
    await expect(
      canvas.getByRole("button", { name: /pm/i }),
    ).toBeInTheDocument();
  },
  render: () => {
    return (
      <HvTimePicker
        timeFormat="12"
        label="Time Picker"
        defaultValue={{ hours: 19, minutes: 30, seconds: 14 }}
      />
    );
  },
};
