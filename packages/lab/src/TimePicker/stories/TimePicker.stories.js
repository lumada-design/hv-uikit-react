/* eslint-disable no-alert */
import React, { useState } from "react";

import HvTimePicker from "../index";
import { getFormattedTime } from "../timePickerFormatter";

export default {
  title: "Lab/Time Picker",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTimePicker } from '@hv/uikit-react-lab/dist'"
  },
  component: HvTimePicker,
  decorators: [storyFn => <div style={{ width: 200, minHeight: 200 }}>{storyFn()}</div>]
};

export const Main = () => <HvTimePicker locale="pt-pt" />;

export const Format12Hours = () => <HvTimePicker locale="en-US" />;

Format12Hours.story = {
  parameters: {
    docs: {
      storyDescription: "TimePicker to select time in 12-hour format."
    }
  }
};

export const CustomDefault = () => (
  <HvTimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
);

CustomDefault.story = {
  parameters: {
    docs: {
      storyDescription: "TimePicker with default custom set time. "
    }
  }
};

export const WithOnChange = () => {
  const timeProps = {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: 30
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

WithOnChange.story = {
  parameters: {
    docs: {
      storyDescription: "TimePicker triggers an onChange when some of values change. "
    }
  }
};
