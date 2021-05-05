/* eslint-disable no-alert */
import React, { useState } from "react";

import { HvButton, HvDropdown } from "@hv/uikit-react-core";
import HvTimePicker from "../index";
import { getFormattedTime } from "../timePickerFormatter";

export default {
  title: "Lab/Time Picker",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTimePicker } from "@hv/uikit-react-lab"',
  },
  component: HvTimePicker,
  decorators: [(storyFn) => <div style={{ width: 200, minHeight: 200 }}>{storyFn()}</div>],
};

export const Main = () => <HvTimePicker id="main" label="Time" locale="pt-pt" />;

Main.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const Format12Hours = () => <HvTimePicker id="format" label="Time" locale="en-US" />;

Format12Hours.parameters = {
  docs: {
    description: { story: "TimePicker to select time in 12-hour format." },
  },
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const CustomDefault = () => (
  <HvTimePicker
    id="custom"
    label="Time"
    hours={14}
    minutes={35}
    seconds={45}
    period="AM"
    timeFormat={12}
  />
);

CustomDefault.parameters = {
  docs: {
    description: { story: "TimePicker with default custom set time. " },
  },
};

export const WithOnChange = () => {
  const timeProps = {
    hours: 9,
    minutes: 10,
    seconds: 30,
  };

  const ControlledTimePicker = () => {
    const [time, setTime] = useState(timeProps);

    const updateTime = ({ hours, minutes, seconds }) => {
      setTime({ hours, minutes, seconds });
    };

    const formattedTime = getFormattedTime(time);

    return (
      <>
        <div>{formattedTime}</div>
        <HvTimePicker id="onchange" label="Time" {...timeProps} onChange={updateTime} />
      </>
    );
  };

  return <ControlledTimePicker />;
};

WithOnChange.parameters = {
  docs: {
    description: { story: "TimePicker triggers an onChange when some of values change. " },
  },
};

export const WithDescription = () => (
  <HvTimePicker id="description" label="Time" description="Pick a time" locale="pt-pt" />
);

WithDescription.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const Disabled = () => <HvTimePicker id="disabled" disabled label="Time" locale="pt-pt" />;

Disabled.decorators = [(storyFn) => <div style={{ minHeight: 60 }}>{storyFn()}</div>];

Disabled.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const WithoutLabel = () => (
  <HvTimePicker id="nolabel" aria-label="Timepicker" locale="pt-pt" />
);

WithoutLabel.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const ExternallyControlled = () => {
  const currentTime = new Date();
  const currentTimeProps = {
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes(),
    seconds: currentTime.getSeconds(),
  };

  const staticTimeProps = {
    hours: 9,
    minutes: 10,
    seconds: 30,
  };

  const [time, setTime] = useState(staticTimeProps);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          width: "250px",
          justifyContent: "space-between",
        }}
      >
        <HvButton
          category="secondary"
          onClick={() => {
            setTime(currentTimeProps);
          }}
        >
          Set Current Time
        </HvButton>

        <HvButton category="secondary" onClick={() => setTime(staticTimeProps)}>
          Set Static Time
        </HvButton>
      </div>
      <HvTimePicker id="controlled" value={time} onChange={(v) => setTime(v)} locale="en-US" />
    </>
  );
};

ExternallyControlled.decorators = [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>];

ExternallyControlled.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const InvalidState = () => (
  <HvTimePicker id="invalid" status="invalid" statusMessage="Invalid period" locale="pt-pt" />
);

InvalidState.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const Localized = () => {
  const [locale, setLocale] = useState("en-US");

  return (
    <>
      <HvDropdown
        id="dropdown7"
        onChange={(item) => setLocale(item.id)}
        values={[
          { id: "pt-PT", label: "Portuguese" },
          { id: "en-US", label: "English" },
        ]}
        label="Select locale"
      />
      <HvTimePicker id="localized" locale={locale} style={{ marginTop: "20px" }} />
    </>
  );
};

Localized.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};
