import React from "react";
import TimePicker from "@hv/uikit-react-lab/dist/TimePicker";
import { getFormattedTime } from "@hv/uikit-react-lab/dist/TimePicker/timePickerFormatter";

const timeProps = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: 30
};

class TimePickerToExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: timeProps
    };
  }

  updateTime = ({ hours, minutes, seconds }) => {
    this.setState({
      time: {
        hours,
        minutes,
        seconds
      }
    });
  };

  render = () => (
    <>
      <div style={{ width: "200px" }}>
        <TimePicker {...timeProps} onChange={this.updateTime} />
      </div>
      <div>{getFormattedTime(this.state.time)}</div>
    </>
  );
}

export default <TimePickerToExport />;
