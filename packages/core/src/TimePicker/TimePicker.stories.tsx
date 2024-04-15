import { useRef, useState } from "react";
import { css, CSSInterpolation } from "@emotion/css";
import { expect } from "@storybook/jest";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import {
  HvButton,
  HvInput,
  HvSwitch,
  HvTimePicker,
  HvTimePickerProps,
  HvTimePickerValue,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
} satisfies Meta<typeof HvTimePicker>;

const makeDecorator =
  (style: CSSInterpolation): Decorator =>
  (Story) => <div className={css(style)}>{Story()}</div>;

export const Main: StoryObj<HvTimePickerProps> = {
  args: {
    label: "Time Picker",
    description: "",
    placeholder: "Select a date",
  },
  argTypes: {
    classes: { control: { disable: true } },
    timeFormat: { control: { disable: true } },
    value: { control: { disable: true } },
    defaultValue: { control: { disable: true } },
    dropdownProps: { control: { disable: true } },
  },
  decorators: [makeDecorator({ minHeight: 200, width: 200 })],
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  // For visual testing and a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /time picker/i });
    await userEvent.click(picker);
    await expect(canvas.getByPlaceholderText("hh")).toBeInTheDocument();
  },
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  // For visual testing and a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /required/i });
    await userEvent.click(picker);
    await expect(canvas.getByPlaceholderText("hh")).toBeInTheDocument();
  },
  render: () => {
    const value: HvTimePickerValue = { hours: 5, minutes: 30, seconds: 14 };

    const classes = {
      root: css({
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        "& > div": {
          width: 200,
        },
      }),
    };

    return (
      <div className={classes.root}>
        <HvTimePicker required label="Required" defaultValue={value} />
        <HvTimePicker disabled label="Disabled" defaultValue={value} />
        <HvTimePicker readOnly label="Read-only" defaultValue={value} />
        <HvTimePicker
          label="Invalid"
          status="invalid"
          statusMessage="This is an invalid time"
          defaultValue={value}
        />
      </div>
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
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

export const Native: StoryObj<HvTimePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `HvInput` component can be configured with the `type='time'` to use the native picker. \
          This can be useful for providing a better mobile experience. Disabled state must be managed by the user",
      },
    },
  },
  decorators: [makeDecorator({ minHeight: 200 })],
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState(false);
    const [showSeconds, setShowSeconds] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      alert(JSON.stringify(data));
    };

    return (
      <form onSubmit={handleSubmit}>
        <HvInput
          required
          disabled={disabled}
          name="scheduleTime"
          label="Schedule"
          inputRef={ref}
          style={{ width: 200 }}
          inputProps={{ type: "time", step: showSeconds ? 1 : 60 }}
          endAdornment={
            <TimeIcon
              color={disabled ? "secondary_60" : undefined}
              onClick={() => ref.current?.showPicker()}
            />
          }
        />
        <br />
        <HvSwitch
          name="disabled"
          label="Disabled"
          onChange={(evt, val) => setDisabled(val)}
        />
        <br />
        <HvSwitch
          name="showSeconds"
          label="Show Seconds"
          onChange={(evt, val) => setShowSeconds(val)}
        />
        <br />
        <HvButton type="submit">Submit</HvButton>
      </form>
    );
  },
};
