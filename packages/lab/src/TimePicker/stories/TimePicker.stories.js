/* eslint-disable no-alert */
import React, { useState } from "react";

import HvTimePicker from "../index";
import { getFormattedTime } from "../timePickerFormatter";

export default {
  title: "Lab/Time Picker",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTimePicker } from '@hv/uikit-react-lab/dist'",
    maturityStatus: "immature",
    dsVersion: "3.2.1",
  },
  component: HvTimePicker,
  decorators: [(storyFn) => <div style={{ width: 200, minHeight: 200 }}>{storyFn()}</div>],
};

export const Main = () => <HvTimePicker locale="pt-pt" />;

Main.parameters = {
  eyes: {
    // excluded due to dynamic date (which is the default that we intend to exemplify)
    include: false,
  },
};

export const Format12Hours = () => <HvTimePicker locale="en-US" />;

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
  <HvTimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
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

    return (
      <>
        <HvTimePicker {...timeProps} onChange={updateTime} />
        <div>{getFormattedTime(time)}</div>
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
