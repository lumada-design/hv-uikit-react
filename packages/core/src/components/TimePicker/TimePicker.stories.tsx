import { useRef, useState } from "react";

import { DecoratorFn, Meta, StoryObj } from "@storybook/react";
import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import { Time as TimeIcon } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvInput,
  HvSwitch,
  HvTimePicker,
  HvTimePickerProps,
  HvTimePickerValue,
} from "@hitachivantara/uikit-react-core";

import { CSSInterpolation, css, cx } from "@emotion/css";
import { Global } from "@emotion/react";

const containerDecorator: DecoratorFn = (Story) => (
  <div className={cx("decorator", css({ width: 250, minHeight: 250 }))}>
    {Story()}
  </div>
);

const unsetDecorator: DecoratorFn = (Story) => (
  <>
    <Global styles={{ ".decorator:has(.unset)": { width: "unset" } }} />
    <div className="unset">{Story()}</div>
  </>
);

export default {
  title: "Components/Time Picker",
  component: HvTimePicker,
  decorators: [containerDecorator],
} as Meta<typeof HvTimePicker>;

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
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));

        return waitFor(() => screen.getByRole("tooltip"));
      },
    },
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
  },
  decorators: [unsetDecorator],
  render: () => {
    const value: HvTimePickerValue = { hours: 5, minutes: 30, seconds: 14 };

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
          "Using `HvTimePicker` with _controlled_ state, using the `value` property.",
      },
    },
    eyes: { include: false },
  },
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
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));

        return waitFor(() => screen.getByRole("tooltip"));
      },
    },
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
    eyes: { include: false },
  },
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
