import { CSSProperties, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvTimePicker,
  HvTimePickerProps,
  HvTimePickerValue,
} from "./TimePicker";
import { HvButton } from "..";

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
} as Meta<typeof HvTimePicker>;

const makeDecorator = (styles: CSSProperties) => (Story) =>
  <div style={styles}>{Story()}</div>;

export const Main: StoryObj<HvTimePickerProps> = {
  args: {
    label: "Time Picker",
    description: "This is a description",
    placeholder: "Select a date",
  },
  argTypes: {
    classes: { control: { disable: true } },
    timeFormat: { control: { disable: true } },
    onChange: { control: { disable: true } },
  },
  decorators: [makeDecorator({ minHeight: 200 })],
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
  args: {},
  argTypes: {},
  decorators: [makeDecorator({ minHeight: 200 })],
  render: () => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log(Object.fromEntries(formData.entries()));
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
  },
  args: {},
  argTypes: {},
  decorators: [
    makeDecorator({
      minHeight: 200,
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
    }),
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
      </>
    );
  },
};

export const Controlled: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Using `HvTimePicker` with _controlled_ state, using the `value` property.",
      },
    },
  },
  args: {},
  argTypes: {},
  decorators: [makeDecorator({ minHeight: 200 })],
  render: () => {
    const [value, setValue] = useState<HvTimePickerValue>({
      hours: 19,
      minutes: 30,
      seconds: 14,
    });

    const prettyValue = `${value.hours}:${value.minutes}:${value.seconds}`;

    return (
      <>
        <div>{prettyValue}</div>
        <br />
        <HvTimePicker
          label="Time Picker"
          defaultValue={value}
          onChange={setValue}
        />
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
  },
  args: {},
  argTypes: {},
  decorators: [makeDecorator({ minHeight: 200 })],
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

export const Native: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "`HvTimePicker` can be configured to use the native picker, via the `showNative` property. \
          This can be useful for providing a better mobile experience.",
      },
    },
  },
  args: {},
  argTypes: {},
  decorators: [makeDecorator({ minHeight: 200 })],
  render: () => {
    return <HvTimePicker name="scheduleTime" label="Schedule" showNative />;
  },
};
