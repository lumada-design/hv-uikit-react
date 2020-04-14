import React from "react";
import TimePicker from "@hv/uikit-react-lab/dist/TimePicker";

const TimePickerToExport = () => (
  <div style={{ width: "200px" }}>
    <TimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
  </div>
);

export default <TimePickerToExport />;
